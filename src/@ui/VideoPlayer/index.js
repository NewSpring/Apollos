import React from 'react';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import styled from '@ui/styled';
import Video from './Video';

const enhance = compose(
  pure,
  setPropTypes({
    src: PropTypes.string,
    posterSrc: PropTypes.string,
    ...Video.propTypes,
  }),
);

const StyledVideo = styled(
  {
    flex: 1,
  },
  'VideoPlayer',
)(Video);

const VideoPlayer = enhance(({
  src, posterSrc, posterSource, ...otherProps
}) => {
  const videoObject = { uri: src };
  const posterObject = { uri: posterSrc };
  return (
    <StyledVideo
      source={videoObject}
      posterSource={posterSrc ? posterObject : posterSource} // posterSrc is convenience prop
      usePoster={!!(posterSrc || posterSource)}
      useNativeControls
      {...otherProps}
    />
  );
});

export default VideoPlayer;
