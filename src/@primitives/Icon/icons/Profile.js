import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} {...otherProps}>
    <Svg.Path
      d="M256 288c47 0 85 38 85 85 0 47-38 86-85 86-47 0-85-39-85-86 0-47 38-85 85-85z m0-43c-70 0-128 58-128 128 0 71 58 128 128 128 70 0 128-57 128-128 0-70-58-128-128-128z m0-85c-97 0-213-46-213-85l0-64-43 42 512 0-43-42 0 64c0 39-116 85-213 85z m0 43c86 0 256-42 256-128l0-64-512 0 0 64c0 86 170 128 256 128z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
