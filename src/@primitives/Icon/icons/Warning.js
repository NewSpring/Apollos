import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} {...otherProps}>
    <Svg.Path
      d="M256 50c113 0 205 92 205 206 0 114-92 206-205 206-113 0-205-92-205-206 0-114 92-206 205-206z m0-50c-141 0-256 115-256 256 0 141 115 256 256 256 141 0 256-115 256-256 0-141-115-256-256-256z m0 205c20 0 34-14 34-34 0-20-14-34-34-34-20 0-34 14-34 34 0 20 14 34 34 34z m-18 34l-7 0-1 7-8 78 0 1 0 68 68 0 0-68 0-1-8-78-1-7z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
