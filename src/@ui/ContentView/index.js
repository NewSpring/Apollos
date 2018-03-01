import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';

import { VideoHeader, ImageHeader, AudioBanner } from './Media';

export { default as HTMLView } from '@ui/HTMLView';
export { H2 as Title, H4 as SubHeading } from '@ui/typography';
export { default as ByLine } from './ByLine';

const enhance = compose(
  pure,
  setPropTypes({
    authors: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    subheading: PropTypes.string,
    body: PropTypes.string,
    video: PropTypes.shape({
      embedUrl: PropTypes.string,
    }),
    audio: PropTypes.arrayOf(
      PropTypes.shape({
        duration: PropTypes.string,
        file: PropTypes.string,
      }),
    ),
    seriesImages: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      }),
    ),
    seriesColors: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string })),
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      }),
    ),
    imageOverlayColor: PropTypes.string,
  }),
);

const ContentWrapper = styled(({ theme }) => ({
  padding: theme.sizing.baseUnit,
}))(View);

const renderHeader = (video, images = [], imageOverlayColor) => {
  let headerType = null;
  if (video && video.embedUrl) {
    headerType = <VideoHeader source={video} />;
  } else if (images && images.length) {
    headerType = <ImageHeader images={images} imageOverlayColor={imageOverlayColor} />;
  }

  return headerType;
};

const renderAudioBar = (title, audio, seriesImages, seriesColors) => {
  let audioComponent = null;
  if (audio && audio.length) {
    const track = {
      title,
      ...audio[0],
    };

    audioComponent = (
      <AudioBanner
        currentTrack={track}
        playlist={{
          title,
          images: seriesImages,
          colors: seriesColors,
          tracks: [track],
        }}
      />
    );
  }

  return audioComponent;
};

const ContentView = enhance(
  ({
    video,
    images = [],
    seriesImages = [],
    seriesColors = [],
    imageOverlayColor = '',
    title,
    audio,
    children,
  }) => (
    <View>
      {renderHeader(video, images, imageOverlayColor)}
      {renderAudioBar(title, audio, seriesImages, seriesColors)}
      <ContentWrapper>{children}</ContentWrapper>
    </View>
  ),
);

export default ContentView;
