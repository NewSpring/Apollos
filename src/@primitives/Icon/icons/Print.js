import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps}>
    <Svg.Path
      d="M113 352l-47 0c-18 0-33-15-33-33l0-130c0-11 5-19 17-19l82 0 0-97 248 0 0 166-248 0 0-69-33 0 0 102 314 0 0-232-314 0 0 97-49 0c-30 0-50 29-50 52l0 130c0 37 30 66 66 66 0 0 33 0 33 0 5 0 312 0 312 0l33 0c38 0 68-29 68-66l0-130c0-29-22-52-52-52l-47 0 0 33 47 0c11 0 19 8 19 19l0 130c0 18-15 33-33 33z m234-177l0 19-182 0 0-19z m0-61l0 18-182 0 0-18z m-215 271l-33 0 0 101 314 0 0-101-33 0 0 68-248 0z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
