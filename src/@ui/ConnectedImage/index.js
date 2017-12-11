import React, { PureComponent } from 'react';
import { Platform, Image } from 'react-native';
import { every } from 'lodash';
import PropTypes from 'prop-types';

// This mirrors the File resource we get from Heighliner:
const ImageSourceType = PropTypes.oneOfType([
  PropTypes.shape({
    url: PropTypes.string,
    label: PropTypes.string,
  }),
  PropTypes.string,
]);

const sizeCache = {};

const getCacheKey = (source) => {
  if (source.size && source.fileLabel) return `${source.size}-${source.fileLabel}`;
  if (source.url) return source.url;
  if (source.uri) return source.uri;
  return undefined;
};

const getCachedSources = (_sources = []) => {
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

class ConnectedImage extends PureComponent {
  static propTypes = {
    source: PropTypes.oneOfType([
      PropTypes.arrayOf(ImageSourceType), ImageSourceType,
    ]),
    ImageComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    maintainAspectRatio: PropTypes.bool,
    style: PropTypes.any, // eslint-disable-line
  }

  static defaultProps = {
    ImageComponent: Image,
    maintainAspectRatio: false,
  }

  state = {
    source: getCachedSources(this.props.source),
  };

  componentWillMount() { this.updateCache(this.props.source); }
  componentWillReceiveProps(newProps) { this.updateCache(newProps.source); }

  get aspectRatio() {
    const style = {};
    if (this.props.maintainAspectRatio) {
      const firstSource = this.state.source[0];
      if (firstSource && firstSource.width && firstSource.height) {
        style.aspectRatio = firstSource.width / firstSource.height;
        if (Platform.OS === 'web') {
          style.height = 0;
          style.paddingTop = `${style.aspectRatio * 100}%`;
        }
      }
    }
    return style;
  }

  async updateCache(sources) {
    await Promise.all(getCachedSources(sources).map((source) => {
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

    this.setState({ source: getCachedSources(sources), cached: true });
  }

  render() {
    if (!this.state.cached) return null; // todo: could render a loading image instead?
    let { source } = this.state;

    // react-native-web currently doesn't support array-based Image sources
    if (Platform.OS === 'web' && Array.isArray(source)) {
      [source] = source;
    }

    const { ImageComponent = Image, style, ...otherProps } = this.props;
    return <ImageComponent {...otherProps} source={source} style={[this.aspectRatio, style]} />;
  }
}

export default ConnectedImage;
