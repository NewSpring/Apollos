import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform } from 'react-native';
import { compose, pure } from 'recompose';
import { H2 } from '@ui/typography';
import ConnectedImage from '@ui/ConnectedImage';
import styled from '@ui/styled';
import ContentHTMLView from './ContentHTMLView';

import ByLine from './ByLine';

const enhance = compose(
  pure,
);

const ImageHeader = styled({
  flex: 1,
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

const ContentWrapper = styled(({ theme }) => ({
  padding: theme.sizing.baseUnit,
}))(View);

const ContentView = enhance(({
  title = '',
  images = [],
  authors = [],
  body = null,
}) => console.log('contentView', { body }) || (
  <View>
    {(images && images.length) ? <ImageHeader source={images} /> : null}
    <ContentWrapper>
      {title ? <H2>{title}</H2> : null}
      <ByLine authors={authors} />
      <ContentHTMLView>
        {body}
      </ContentHTMLView>
    </ContentWrapper>
  </View>
));

ContentView.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  body: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
  })),
};

export default ContentView;
