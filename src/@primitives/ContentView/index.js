import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { compose, pure } from 'recompose';
import { H1, H7 } from '@primitives/typography';
import HTMLView from '@primitives/HTMLView';

const enhance = compose(
  pure,
);

const ContentView = enhance(({
  body = null,
}) => (
  <HTMLView>
    {body}
  </HTMLView>
));

ContentView.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  content: PropTypes.shape({
    body: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
    })),
  }),
};

export default ContentView;
