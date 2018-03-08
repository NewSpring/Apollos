import React from 'react';
import PropTypes from 'prop-types';
import { createElement } from 'react-native-web';
import styled from '@ui/styled';

const StyledNativeVideo = styled({
  'object-fit': 'cover',
})(props => createElement('video', props));

// very, very naive implementation of video on web.
// Currently only supports a limited number of properties.
// Its use isn't exactly recommended yet, except as uncontrolled background video
const Video = ({
  source: { uri } = {},
  posterSource,
  useNativeControls = true,
  shouldPlay = false,
  isLooping = false,
  type = 'video/mp4',
  style,
}) => (
  <StyledNativeVideo
    poster={posterSource}
    controls={useNativeControls}
    loop={isLooping}
    style={style}
    autoPlay={shouldPlay}
  >
    <source src={uri} type={type} />
  </StyledNativeVideo>
);

Video.propTypes = {
  source: PropTypes.shape({
    uri: PropTypes.string,
  }),
  type: PropTypes.string,
  posterSource: PropTypes.shape({
    uri: PropTypes.string,
  }),
  useNativeControls: PropTypes.bool,
  shouldPlay: PropTypes.bool,
  isLooping: PropTypes.bool,
  style: PropTypes.any, // eslint-disable-line
};

export default Video;
