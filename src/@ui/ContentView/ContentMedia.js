import React from 'react';
import { View, Platform } from 'react-native';
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
    web: {
      height: 0,
      paddingTop: '50%',
    },
  }),
})(EmbeddedVideoPlayer);

const ContentMedia = ({
  images = [],
  video,
}) => {
  let visual = null;
  if (video && video.embedUrl) {
    visual = (
      <VideoHeader src={video.embedUrl} />
    );
  } else if (images && images.length) {
    visual = (
      <ImageHeader source={images} />
    );
  }

  return (
    <View>
      {visual}
    </View>
  );
};

ContentMedia.propTypes = {
  images: PropTypes.any, // eslint-disable-line
  video: PropTypes.shape({
    embedUrl: PropTypes.string,
  }),
};

export default ContentMedia;

