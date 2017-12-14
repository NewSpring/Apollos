import React from 'react';
import PropTypes from 'prop-types';
import { Video } from 'expo';
import styled from '@ui/styled';

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
