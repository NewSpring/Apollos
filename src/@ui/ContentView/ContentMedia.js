import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ConnectedImage from '@ui/ConnectedImage';
import EmbeddedVideoPlayer from '@ui/EmbeddedVideoPlayer';
import styled from '@ui/styled';

const ImageHeader = styled({
  width: '100%',
  aspectRatio: 1,
  resizeMode: 'cover',
  ...Platform.select({
    web: {
      height: 0,
      paddingTop: '50%',
    },
  }),
})(ConnectedImage);

const VideoHeader = styled({
  width: '100%',
  aspectRatio: 16 / 9,
  ...Platform.select({
    web: StyleSheet.absoluteFillObject,
  }),
})(EmbeddedVideoPlayer);

const VideoWrapper = styled(Platform.select({
  web: {
    position: 'relative',
    paddingBottom: '56.25%', // NOTE: 16:9 :D
    overflow: 'hidden',
    width: '100%',
    height: 0,
  },
}))(View);

const ContentMedia = ({
  images = [],
  video,
}) => {
  let visual = null;
  if (video && video.embedUrl) {
    visual = (
      <VideoWrapper>
        <VideoHeader src={video.embedUrl} />
      </VideoWrapper>
    );
  } else if (images && images.length) {
    visual = (
      <ImageHeader source={images} />
    );
  }

  // TODO: later this should support audio button below player
  return visual;
};

ContentMedia.propTypes = {
  images: PropTypes.any, // eslint-disable-line
  video: PropTypes.shape({
    embedUrl: PropTypes.string,
  }),
};

export default ContentMedia;

