import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} {...otherProps}>
    <Svg.Path
      d="M256 0l256 0 0 256c0 171-115 256-256 256-141 0-256-115-256-256 0-141 82-256 256-256l0 41c-139 0-215 83-215 215 0 119 96 215 215 215 130 0 215-78 215-215l0-256 41 41-256 0z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
