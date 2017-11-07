import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} {...otherProps}>
    <Svg.Path
      d="M291 97c10 0 18 8 18 18 0 10-8 17-18 17l-70 0c-10 0-18-7-18-17 0-10 8-18 18-18z m-291 300c0-10 8-17 18-17l476 0c10 0 18 7 18 17 0 10-8 18-18 18l-476 0c-10 0-18-8-18-18z m406-159c10 0 18 8 18 18 0 10-8 18-18 18l-300 0c-10 0-18-8-18-18 0-10 8-18 18-18z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
