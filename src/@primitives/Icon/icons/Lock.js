import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps}>
    <Svg.Path
      d="M183 293l146 0 0 54c0 21-7 38-21 52-15 14-32 22-52 22-20 0-37-8-52-22-14-14-21-31-21-52z m238-28l0-164c0-8-3-15-8-20-6-5-12-8-20-8l-274 0c-8 0-14 3-20 8-5 5-8 12-8 20l0 164c0 8 3 14 8 20 6 5 12 8 20 8l9 0 0 54c0 35 13 66 38 91 25 25 55 37 90 37 35 0 65-12 90-37 25-25 38-56 38-91l0-54 9 0c8 0 14-3 20-8 5-6 8-12 8-20z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
