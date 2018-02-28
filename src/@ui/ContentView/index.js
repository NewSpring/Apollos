import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';

import { VideoHeader, ImageHeader } from './Media';

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
    headerType = <VideoHeader source={video.embedUrl} />;
  } else if (images && images.length) {
    headerType = <ImageHeader images={images} imageOverlayColor={imageOverlayColor} />;
  }

  return headerType;
};

const ContentView = enhance(({
  video, images = [], imageOverlayColor = '', children,
}) => (
  <View>
    {renderHeader(video, images, imageOverlayColor)}
    <ContentWrapper>{children}</ContentWrapper>
  </View>
));

export default ContentView;
