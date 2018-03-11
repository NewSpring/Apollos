import React from 'react';
import { compose, pure, setPropTypes } from 'recompose';
import { View, Platform, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import EmbeddedVideoPlayer from '@ui/EmbeddedVideoPlayer';
import styled from '@ui/styled';

const enhance = compose(
  pure,
  setPropTypes({
    source: PropTypes.shape({
      embedUrl: PropTypes.string,
    }),
  }),
);

const Video = styled({
  width: '100%',
  aspectRatio: 16 / 9,
  ...Platform.select({
    web: StyleSheet.absoluteFillObject,
  }),
})(EmbeddedVideoPlayer);

const VideoWrapper = styled(
  Platform.select({
    web: {
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      overflow: 'hidden',
      width: '100%',
      height: 0,
    },
  }),
)(View);

const VideoHeader = enhance(({ source }) => (
  <VideoWrapper>
    <Video src={source.embedUrl} />
  </VideoWrapper>
));

export default VideoHeader;
