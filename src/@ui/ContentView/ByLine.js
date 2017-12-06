import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { compose, pure, branch, renderNothing } from 'recompose';
import { H6 } from '@ui/typography';

const enhance = compose(
  pure,
  branch(({ authors }) => !authors || !authors.length, renderNothing),
);

const ByLine = enhance(({ authors }) => (
  <H6>By: {startCase(authors.join(', '))}</H6>
));

ByLine.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.string),
};

export default ByLine;
