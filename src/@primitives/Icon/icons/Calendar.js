import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} {...otherProps}>
    <Svg.Path
      d="M55 37l402 0 0 292-402 0z m110 347l0 82c0 3-1 5-3 7-2 2-4 2-7 2l-18 0c-3 0-5 0-6-2-2-2-3-4-3-7l0-82c0-3 1-5 3-7 1-1 3-2 6-2l18 0c3 0 5 1 7 2 2 2 3 4 3 7z m219 0l0 82c0 3-1 5-3 7-1 2-3 2-6 2l-18 0c-3 0-5 0-7-2-2-2-3-4-3-7l0-82c0-3 1-5 3-7 2-1 4-2 7-2l18 0c3 0 5 1 6 2 2 2 3 4 3 7z m110 18l0-365c0-10-4-19-11-26-7-7-16-11-26-11l-402 0c-10 0-19 4-26 11-7 7-11 16-11 26l0 365c0 10 4 19 11 26 7 7 16 11 26 11l36 0 0 27c0 13 5 24 14 33 9 9 20 13 32 13l18 0c13 0 24-4 33-13 9-9 13-20 13-33l0-27 110 0 0 27c0 13 4 24 13 33 9 9 20 13 33 13l18 0c12 0 23-4 32-13 9-9 14-20 14-33l0-27 36 0c10 0 19-4 26-11 7-7 11-16 11-26z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
