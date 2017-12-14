import React from 'react';
import PropTypes from 'prop-types';
import styled from '@ui/styled';
import Video from './Video';

const StyledVideo = styled({
  flex: 1,
}, 'VideoPlayer')(Video);

const VideoPlayer = ({ src, ...otherProps }) => (
  <StyledVideo
    source={{ uri: src }}
    useNativeControls
    {...otherProps}
  />
);

VideoPlayer.propTypes = {
  src: PropTypes.string,
  ...Video.propTypes,
};

export default VideoPlayer;
