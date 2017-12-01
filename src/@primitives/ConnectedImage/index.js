import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

// This mirrors the File resource we get from Heighliner:
const ImageSourceType = PropTypes.oneOfType([
  PropTypes.shape({
    url: PropTypes.string,
    label: PropTypes.string,
  }),
  PropTypes.string,
]);

const sizeCache = {};

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
    ...(sizeCache[source.size] || {}),
  }));
};

class ConnectedImage extends PureComponent {
  static propTypes = {
    source: PropTypes.oneOfType([
      PropTypes.arrayOf(ImageSourceType), ImageSourceType,
    ]),
    ImageComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }

  static defaultProps = {
    ImageComponent: Image,
  }

  state = {
    source: getCachedSources(this.props.source),
  };

  componentWillMount() { this.updateCache(this.props.source); }
  componentWillReceiveProps(newProps) { this.updateCache(newProps.source); }

  async updateCache(sources) {
    await Promise.all(getCachedSources(sources).map((source) => {
      if (sizeCache[source.size]) return Promise.resolve(source);
      return (new Promise((resolve, reject) => {
        Image.getSize(source.uri, (width, height) => resolve({
          width, height,
        }), reject);
      })).then((sizeForCache) => {
        sizeCache[source.size] = sizeForCache;
      });
    }));

    this.setState({ source: getCachedSources(sources) });
  }

  render() {
    let { ImageComponent } = this.props;
    if (!ImageComponent) ImageComponent = Image;
    return <ImageComponent {...this.props} source={this.state.source} />;
  }
}

export default ConnectedImage;
