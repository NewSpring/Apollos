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
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
    })),
    video: PropTypes.shape({
      embedUrl: PropTypes.string,
    }),
  }),
);

const ContentWrapper = styled(({ theme }) => ({
  padding: theme.sizing.baseUnit,
}))(View);

const ContentView = enhance(({
  images = [],
  video,
  children,
}) => (
  <View>
    <ContentMedia images={images} video={video} />
    <ContentWrapper>
      {children}
    </ContentWrapper>
  </View>
));

export default ContentView;
