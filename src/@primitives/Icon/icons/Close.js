import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps}>
    <Svg.Path
      d="M472 506c-3-3-3-3-14-14l-452-452c-8-9-8-22 0-30 9-9 22-9 30 0l452 451c11 11 11 11 14 15 9 8 9 21 0 30-8 8-21 8-30 0z m-466-30c3-4 3-4 14-15l452-451c9-9 22-9 30 0 9 8 9 21 0 30l-451 452c-11 11-11 11-15 14-8 8-21 8-30 0-8-9-8-22 0-30z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
