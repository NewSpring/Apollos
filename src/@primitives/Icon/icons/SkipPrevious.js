import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} {...otherProps}>
    <Svg.Path
      d="M215 473l0-430c0-3 0-4 0-4 2 4 6 9 13 12 6 2 12 2 17 0 0 0-1 1-4 3l-186 187c-8 8-8 21 0 30l187 191c2 2 4 3 3 3-4-2-10-2-17 0-7 3-11 8-13 12 0 1 0-1 0-4z m41 0c0 34-19 42-43 17l-188-191c-23-24-23-63 1-87l187-187c24-24 43-15 43 18z m215 0l0-430c0-3 0-4 0-4 2 4 6 9 13 12 7 3 14 2 18 0 0 0-1 1-3 4l-189 195c-7 8-7 21 1 29l186 183c2 2 3 3 3 3-4-2-10-2-17 1-6 3-10 7-12 11 0 0 0-1 0-4z m41 0c0 34-20 42-44 18l-186-182c-24-24-24-63-1-88l188-195c24-24 43-16 43 17z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
