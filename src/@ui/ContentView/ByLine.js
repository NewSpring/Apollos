import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { compose, pure, branch, renderNothing, setPropTypes } from 'recompose';
import styled from '@ui/styled';
import { H6 } from '@ui/typography';

const enhance = compose(
  pure,
  branch(({ authors }) => !authors || !authors.length, renderNothing),
  setPropTypes({
    authors: PropTypes.arrayOf(PropTypes.string),
  }),
  styled(({ theme }) => ({
    paddingBottom: theme.helpers.rem(0.5),
  })),
);

const ByLine = enhance(({ authors, style }) => (
  <H6 style={style}>By: {startCase(authors.join(', '))}</H6>
));

export default ByLine;
