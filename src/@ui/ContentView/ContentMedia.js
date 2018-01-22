import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Color from 'color';

import ConnectedImage from '@ui/ConnectedImage';
import EmbeddedVideoPlayer from '@ui/EmbeddedVideoPlayer';
import styled from '@ui/styled';
import LinearGradient from '@ui/LinearGradient';

const ImageOverlay = styled({
  ...StyleSheet.absoluteFillObject,
})(LinearGradient);

const getGradientValues = (overlayColor) => {
  const values = {
    colors: [`${Color(overlayColor).fade(1).string()}`, overlayColor],
    start: [0, 0],
    end: [0, 1],
    locations: [0.3, 1],
  };

  return values;
};

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
  video,
  images = [],
  imageOverlayColor,
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
      <View>
        <ImageHeader source={images} />
        {imageOverlayColor && (
          <ImageOverlay
            colors={getGradientValues(imageOverlayColor).colors}
            start={getGradientValues(imageOverlayColor).start}
            end={getGradientValues(imageOverlayColor).end}
            locations={getGradientValues(imageOverlayColor).locations}
          />
        )}
      </View>
    );
  }

  // TODO: later this should support audio button below player
  return visual;
};

ContentMedia.propTypes = {
  video: PropTypes.shape({
    embedUrl: PropTypes.string,
  }),
  images: PropTypes.any, // eslint-disable-line
  imageOverlayColor: PropTypes.string,
};

export default ContentMedia;
