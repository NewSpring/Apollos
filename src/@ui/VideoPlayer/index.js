import React from 'react';
import PropTypes from 'prop-types';
import Video from './Video';

const flex = { flex: 1 };

export { Video };

const VideoPlayer = ({ src, videoRef, ...otherProps }) => (
  <Video
    ref={videoRef}
    style={flex}
    source={{ uri: src }}
    useNativeControls
    {...otherProps}
  />
);

VideoPlayer.propTypes = {
  src: PropTypes.string,
  videoRef: PropTypes.func,
  ...Video.propTypes,
};

export default VideoPlayer;
