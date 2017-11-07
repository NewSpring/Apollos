import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps}>
    <Svg.Path
      d="M157 506l231-232c8-8 8-21 0-29-8-8-21-8-29 0l-231 232c-8 8-8 21 0 29 8 8 21 8 29 0z m231-264l-231-232c-8-8-21-8-29 0-8 8-8 21 0 29l231 231c8 8 21 8 29 0 8-8 8-20 0-28z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
