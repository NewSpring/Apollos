import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} {...otherProps}>
    <Svg.Path
      d="M281 229l0 254c0 14-11 25-25 25-14 0-25-11-25-25l0-256-81 81c-9 10-25 10-34 0-10-9-10-25 0-35l121-120c5-6 11-8 18-8 7 0 13 2 18 8l121 120c10 10 10 26 0 35-9 10-25 10-34 0z m-222-17l0-146c0-8 10-17 25-17l344 0c15 0 25 9 25 17l0 146c0 8 49 37 49 0l0-146c0-36-33-66-74-66l-344 0c-41 0-74 30-74 66l0 146c0 37 49 8 49 0z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
