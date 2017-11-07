import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps}>
    <Svg.Path
      d="M256 512c-141 0-256-115-256-256 0-141 82-256 256-256l256 0 0 256c0 171-115 256-256 256z m132-386l-80 0 0 115c0 23-1 27-5 35-5 11-17 18-32 18-26 0-42-18-42-47l0-122-79 0 0 232 152 0c27 0 48-8 65-24 16-17 20-32 20-63l0-144z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
