import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps}>
    <Svg.Path
      d="M0 256l99 132 413 0 0-264-413 0z m192 40l14-45-28 0z m28-90l28 0-41 116-29 0-42-116 29 0 6 22 42 0z m140 116l0-116 79 0 0 24-51 0 0 92z m-97 0l0-116 79 0 0 24-51 0 0 92z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
