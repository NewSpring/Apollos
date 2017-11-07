import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} {...otherProps}>
    <Svg.Path
      d="M272 491l-85-107-85 0c-36 0-59-34-59-69l0-123c0-35 23-64 59-64l85 0 85-107c22 0 48 0 48 0l0 470c-21 0-26 0-48 0z m-101-320l-69 0c-12 0-17 9-17 21l0 123c0 11 5 26 17 26l69 0z m106-86l-85 86 0 170 85 86z m86 278l0-45c42-9 42-32 42-60 0-28 0-51-42-60l0-44c64 10 85 53 85 104 0 52-21 95-85 105z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
