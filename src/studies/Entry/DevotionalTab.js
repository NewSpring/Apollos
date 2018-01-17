import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import { startCase, toLower } from 'lodash';

import ContentView, { Title, HTMLView } from '@ui/ContentView';

const enhance = compose(
  pure,
  setPropTypes({
    title: PropTypes.string,
    body: PropTypes.string,
  }),
);

const titleCase = text => (startCase(toLower(text)));

const DevotionalTab = enhance(({ title, body, otherContentProps }) => (
  <ContentView {...otherContentProps}>
    <Title>{titleCase(title)}</Title>
    <HTMLView>{body}</HTMLView>
  </ContentView>
));

export default DevotionalTab;
