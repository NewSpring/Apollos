import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { compose, pure, branch, renderNothing, setPropTypes } from 'recompose';
import { H6 } from '@ui/typography';

const enhance = compose(
  pure,
  branch(({ authors }) => !authors || !authors.length, renderNothing),
  setPropTypes({
    authors: PropTypes.arrayOf(PropTypes.string),
  }),
);

const ByLine = enhance(({ authors }) => (
  <H6>By: {startCase(authors.join(', '))}</H6>
));

export default ByLine;
