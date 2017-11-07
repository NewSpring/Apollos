import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps}>
    <Svg.Path
      d="M299 230l0-145-72 72-30-29 11 0 86-107c21 0 47 0 47 0l0 251z m-192-41c0 1 0 2 0 3l0 123c0 11 4 26 16 26l69 0 0-67 21 21 0 46 86 86 0-47 42 43 0 68c-21 0-26 0-47 0l-86-107-85 0c-35 0-59-34-59-69l0-123c0-14 4-26 10-36z m-34-140l-30 30 394 395 31-30z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
