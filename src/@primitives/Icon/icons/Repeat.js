import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} {...otherProps}>
    <Svg.Path
      d="M56 142l0 1c1 0 1 0 1 0l89 83c9 8 22 8 30-1 8-9 8-22-1-30l-55-52c3 0 7 0 11 0 45 0 45 0 95 0 104 0 104 0 162 0l-7-1c31 11 49 28 59 50 7 18 9 38 7 55-1 2-1 4-1 4l40 10c0-2 1-5 1-9 3-24 1-51-10-76-14-33-41-58-83-73l-3-1-3 0c-58 0-58 0-162 0-50 0-50 0-95 0-6 0-11 0-16 0l58-57c8-8 8-22 0-30-9-9-22-9-31 0l-91 91c-4 4-6 10-6 15-1 6 2 12 7 17z m400 228l0-1c-1 0-1 0-1 0l-89-83c-9-8-22-8-30 1-8 9-8 22 1 30l55 52c-3 0-7 0-11 0-45 0-45 0-95 0-104 0-104 0-162 0l7 1c-31-11-49-28-59-50-7-18-9-38-7-55 1-2 1-4 1-4l-40-10c0 2-1 5-1 9-3 24-1 51 10 76 14 33 41 58 83 73l3 1 3 0c58 0 58 0 162 0 50 0 50 0 95 0 6 0 11 0 16 0l-58 57c-8 8-8 22 0 30 9 9 22 9 31 0l91-91c4-4 6-10 6-15 1-6-2-12-7-17z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
