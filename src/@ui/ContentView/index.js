import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import ContentMedia from './ContentMedia';

export { H2 as Title, H4 as SubHeading } from '@ui/typography';
export { default as ByLine } from './ByLine';
export { default as HTMLView } from './ContentHTMLView';

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
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
    })),
    imageOverlayColor: PropTypes.string,
  }),
);

const ContentWrapper = styled(({ theme }) => ({
  padding: theme.sizing.baseUnit,
}))(View);

const ContentView = enhance(({
  video,
  images = [],
  imageOverlayColor = '',
  children,
}) => (
  <View>
    <ContentMedia images={images} video={video} imageOverlayColor={imageOverlayColor} />
    <ContentWrapper>
      {children}
    </ContentWrapper>
  </View>
));

export default ContentView;
