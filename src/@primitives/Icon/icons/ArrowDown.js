import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} {...otherProps}>
    <Svg.Path
      d="M11 354l227-228c8-7 21-7 28 0 8 8 8 21 0 29l-227 227c-8 8-20 8-28 0-8-8-8-21 0-28z m259-228l227 228c8 7 8 20 0 28-7 8-20 8-28 0l-227-227c-8-8-8-21 0-29 8-7 20-7 28 0z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
