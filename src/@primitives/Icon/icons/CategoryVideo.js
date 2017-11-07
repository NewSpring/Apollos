import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps}>
    <Svg.Path
      d="M33 396l0-280c0 0 0 0 0 0l259 0c0 0 0 0 0 0l0 177 52-36 154-107c-7 5-25-4-25-13l0 238c0-9 18-18 25-13l-154-107-52-36 0 177c0 0 0 0 0 0l-259 0c0 0 0 0 0 0z m292-166l0-114c0-19-15-33-33-33l-259 0c-18 0-33 14-33 33l0 280c0 19 15 33 33 33l259 0c18 0 33-14 33-33l0-114 154 107c15 10 27 4 27-14l0-238c0-18-12-24-27-14z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
