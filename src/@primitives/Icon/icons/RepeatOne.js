import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} {...otherProps}>
    <Svg.Path
      d="M0 256l99 132 413 0 0-264-413 0z m193 15l0-18c0-16-8-28-24-28-17 0-25 12-25 28l0 18c0 16 8 27 25 27 16 0 24-11 24-27z m29-16l0 14c0 31-18 53-53 53-35 0-53-22-53-53l0-14c0-31 18-53 53-53 35 0 53 22 53 53z m140-51l84 0 0 24-55 0 0 23 50 0 0 23-50 0 0 22 55 0 0 24-84 0z m-23 0l0 116-28 0 0-68-43 68-27 0 0-116 28 0 0 68 43-68z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
