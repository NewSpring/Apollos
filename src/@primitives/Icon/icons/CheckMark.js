import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} {...otherProps}>
    <Svg.Path
      d="M5 239l155-165c7-7 19-7 26 0 8 6 8 18 1 25l-155 165c-7 7-19 8-26 1-8-7-8-19-1-26z m182-165l315 331c7 8 7 19-1 26-7 7-19 7-25 0l-316-332c-6-7-6-18 1-25 7-7 19-7 26 0z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
