import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} {...otherProps}>
    <Svg.Path
      d="M487 492c8-3 14-11 14-20l0-139c0-12-10-22-22-22-12 0-22 10-22 22l0 130-130 0c-12 0-22 9-22 22 0 12 10 22 22 22l139 0c10 0 18-6 21-15z m0-472c8 3 14 11 14 20l0 139c0 12-10 22-22 22-12 0-22-10-22-22l0-130-130 0c-12 0-22-9-22-22 0-12 10-22 22-22l139 0c10 0 18 6 21 15z m-443 29l0 130c0 12-10 22-22 22-12 0-22-10-22-22l0-139c0-9 6-17 14-20 3-9 11-15 21-15l139 0c12 0 22 10 22 22 0 13-10 22-22 22z m-30 443c-8-3-14-11-14-20l0-139c0-12 10-22 22-22 12 0 22 10 22 22l0 130 130 0c12 0 22 9 22 22 0 12-10 22-22 22l-139 0c-10 0-18-6-21-15z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
