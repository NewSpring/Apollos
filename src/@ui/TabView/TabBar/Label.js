import React from 'react';
import PropTypes from 'prop-types';
import { H6 } from '@ui/typography';

const Label = ({ route }) => {
  const labelText = route.title;
  return <H6>{labelText}</H6>;
};

Label.propTypes = { route: PropTypes.shape({ title: PropTypes.string }) };

export default Label;
