import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps}>
    <Svg.Path
      d="M422 461c15-12 29-26 41-41l-404 0c13 15 27 29 43 41z m-32 20c-39 21-85 31-134 31-44 0-86-11-122-31z m86-82c8-12 14-26 20-41l-475 0c7 15 14 28 23 41z m26-61c3-13 6-27 8-41l-507 0c3 14 6 28 10 41z m9-62c1-6 1-13 1-20l0-20-511 0c-1 6-1 13-1 20 0 7 0 14 1 20z m1-122l0-41-477 0c-7 13-13 26-18 41z m0 20l0 41-510 0c2-14 5-28 8-41z m0-123l0 41-463 0c11-15 24-29 40-41z m0-20l0-31-256 0c-54 0-99 11-136 31z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
