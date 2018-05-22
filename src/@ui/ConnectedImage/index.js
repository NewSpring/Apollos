import React, { PureComponent } from 'react';
import { Animated, Platform, Image } from 'react-native';
import PropTypes from 'prop-types';
import { every } from 'lodash';
import makeCancelable from '@utils/makeCancelable';
import styled from '@ui/styled';

import SkeletonImage from './SkeletonImage';

// This mirrors the File resource we get from Heighliner:
const ImageSourceType = PropTypes.oneOfType([
  PropTypes.shape({
    uri: PropTypes.string,
    label: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  PropTypes.string,
]);

export const sizeCache = {};

export const getCacheKey = (source) => {
  if (source.size && source.fileLabel) return `${source.size}-${source.fileLabel}`;
  if (source.url) return source.url;
  if (source.uri) return source.uri;
  return undefined;
};

export const getCachedSources = (_sources = []) => {
  let sources = _sources;
  if (!Array.isArray(sources)) sources = [sources];
  sources = sources.map((source) => {
    if (typeof source === 'string') return { url: source };
    return source;
  });

  return sources.map(source => ({
    uri: (source.url || '').replace(/^http:\/\/|^\/\//i, 'https://'),
    ...source,
    ...(sizeCache[getCacheKey(source)] || {}),
  }));
};

export const updateCache = sources => Promise.all(getCachedSources(sources).map((source) => {
  const key = getCacheKey(source);
  if (sizeCache[key] || !key) return Promise.resolve(source);
  return (new Promise((resolve, reject) => {
    Image.getSize(source.uri, (width, height) => resolve({
      width, height,
    }), reject);
  })).then((sizeForCache) => {
    if (key) sizeCache[key] = sizeForCache;
  });
}));

const withBackgroundColor = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.inactive,
}));

class ConnectedImage extends PureComponent {
  static propTypes = {
    source: PropTypes.oneOfType([
      PropTypes.arrayOf(ImageSourceType),
      ImageSourceType,
    ]),
    ImageComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    maintainAspectRatio: PropTypes.bool,
    isLoading: PropTypes.bool,
    onLoad: PropTypes.func,
    style: PropTypes.any, // eslint-disable-line
  }

  static defaultProps = {
    ImageComponent: Animated.Image,
    maintainAspectRatio: false,
  }

  state = {
    source: getCachedSources(this.props.source),
  };

  componentWillMount() { this.updateCache(this.props.source); }
  componentWillReceiveProps(newProps) { this.updateCache(newProps.source); }

  componentWillUnmount() {
    if (this.cacheUpdater) this.cacheUpdater.cancel();
  }

  onLoad = (...args) => {
    Animated.timing(this.imageOpacity, {
      toValue: 1,
      duration: 250,
    }).start();
    if (this.props.onLoad) this.props.onLoad(...args);
  }

  get aspectRatio() {
    const style = {};
    if (this.props.maintainAspectRatio) {
      const firstSource = this.state.source[0];
      if (firstSource && firstSource.width && firstSource.height) {
        if (Platform.OS === 'web') {
          style.height = 0;
          style.paddingTop = `${style.aspectRatio * 100}%`;
        } else {
          style.aspectRatio = firstSource.width / firstSource.height;
        }
      }
    }
    return style;
  }

  get isLoading() {
    return this.props.isLoading || !every(this.state.source, image => image.width && image.height);
  }

  imageOpacity = new Animated.Value(0);

  updateCache(sources) {
    this.cacheUpdater = makeCancelable(updateCache(sources));
    this.cacheUpdater.promise.then(() => {
      const newSource = getCachedSources(sources);
      const oldSource = this.state.source || [];

      if (newSource.length !== oldSource.length ||
        newSource.find((source, i) => (
          !oldSource[i] ||
          getCacheKey(source) !== getCacheKey(oldSource[i]) ||
          source.width !== oldSource[i].width ||
          source.height !== oldSource[i].height
        ))
      ) {
        this.setState({ source: getCachedSources(sources) });
      }
    }).catch(() => {
      // todo: Right now, if there's an error on connected image that means one of two things:
      // 1) the image component was unmounted before load...we should do nothing
      // 2) the image failed to load. Our "empty" state for images is a graybox.
      //    We could make this better by showing an alert icon or something on error,
      //    But a gray box is better then nothing. so, we do nothing currently :)
      //    However, we still need this empty catch function as uncaught promise errors
      //    will throw an error up the food chain.
    });
  }

  render() {
    let { source } = this.state;
    if (!Array.isArray(source)) source = [source];

    // react-native-web currently doesn't support array-based Image sources
    if (Platform.OS === 'web' && Array.isArray(source)) {
      [source] = source;
    }

    const {
      ImageComponent = Animated.Image, style, isLoading, maintainAspectRatio, ...otherProps
    } = this.props;

    return (
      <SkeletonImage onReady={!this.isLoading}>
        <ImageComponent
          {...otherProps}
          source={source}
          onLoad={this.onLoad}
          style={[this.aspectRatio, { opacity: this.imageOpacity }, style]}
        />
      </SkeletonImage>
    );
  }
}

const enhanced = withBackgroundColor(ConnectedImage);
enhanced.propTypes = ConnectedImage.propTypes;
export default enhanced;
