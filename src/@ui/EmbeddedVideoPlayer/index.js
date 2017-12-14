import React from 'react';
import PropTypes from 'prop-types';
import WebView from './WebView';

const EmbeddedVideoPlayer = ({ src, ...otherProps }) => (
  <WebView
    source={{ uri: src }}
    mediaPlaybackRequiresUserAction={false}
    allowsInlineMediaPlayback
    bounces={false}
    scrollEnabled={false}
    {...otherProps}
  />
);

EmbeddedVideoPlayer.propTypes = {
  src: PropTypes.string,
};

export default EmbeddedVideoPlayer;
