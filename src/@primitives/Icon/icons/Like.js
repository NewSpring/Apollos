import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 514 514" {...otherProps}>
    <Svg.Path
      d="M284 49l0 0-58 0 0 0 36 36 1 1 1 1c162 144 205 197 205 264 0 56-43 100-99 100-31 0-63-15-84-40l-31-37-31 37c-21 25-53 40-84 40-56 0-99-44-99-100 0-67 43-120 206-264l0-1 1-1z m-59 416c-1 0-1-1-1-1l2 0c11-7 21-16 29-26 8 10 18 19 29 26l2 0c0 0 0 1 0 1 24 17 54 27 84 27 79 0 140-62 140-141 0-98-87-177-219-295l-36-36-36 36c-132 118-219 197-219 295 0 79 61 141 140 141 30 0 60-10 85-27z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
