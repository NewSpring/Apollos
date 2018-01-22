import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';


import { H1 } from '@ui/typography';

const enhance = compose(
  pure,
  setPropTypes(),
);

const SeriesTrailer = enhance(() => (
  <H1>Boom</H1>
));

export default SeriesTrailer;
