import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import Placeholder from '@ui/Placeholder';

import { VideoHeader, ImageHeader, AudioBanner } from './Media';

export { default as HTMLView } from '@ui/HTMLView';
export { H3 as Title, H4 as SubHeading } from '@ui/typography';
export { default as ByLine } from './ByLine';

const enhance = compose(
  pure,
  setPropTypes({
    contentId: PropTypes.string,
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
    thumbnail: PropTypes.arrayOf(
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

const renderHeader = ({
  video, images = [], thumbnailImage, imageOverlayColor,
}) => {
  let headerType = null;
  if (video && video.embedUrl) {
    headerType = <VideoHeader source={video} />;
  } else if (images && images.length) {
    headerType = (
      <ImageHeader
        images={images}
        thumbnail={thumbnailImage}
        imageOverlayColor={imageOverlayColor}
      />
    );
  }

  return headerType;
};

const renderAudioBar = ({
  contentId, title, audio, seriesImages, seriesColors,
}) => {
  let audioComponent = null;
  if (audio && audio.length) {
    const track = {
      title,
      ...audio[0],
    };

    audioComponent = (
      <AudioBanner
        mediaId={contentId}
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
    contentId,
    video,
    images = [],
    thumbnailImage,
    seriesImages = [],
    seriesColors = [],
    imageOverlayColor = '',
    title,
    audio,
    children,
    isLoading,
  }) => (
    <View>
      {renderHeader({
        video, images, thumbnailImage, imageOverlayColor,
      })}
      {renderAudioBar({
        contentId, title, audio, seriesImages, seriesColors,
      })}
      <ContentWrapper>
        {children}
        {isLoading ? <Placeholder.Paragraph /> : null}
      </ContentWrapper>
    </View>
  ),
);

export default ContentView;
