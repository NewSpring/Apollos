import React from 'react';
import PropTypes from 'prop-types';
import styled from '@ui/styled';
import Video from './Video';

const StyledVideo = styled(
  {
    flex: 1,
  },
  'VideoPlayer',
)(Video);

const VideoPlayer = ({
  src, posterSrc, posterSource, ...otherProps
}) => (
  <StyledVideo
    source={{ uri: src }}
    posterSource={posterSrc ? { uri: posterSrc } : posterSource} // posterSrc is convenience prop
    usePoster={!!(posterSrc || posterSource)}
    useNativeControls
    {...otherProps}
  />
);

VideoPlayer.propTypes = {
  src: PropTypes.string,
  posterSrc: PropTypes.string,
  ...Video.propTypes,
};

export default VideoPlayer;
