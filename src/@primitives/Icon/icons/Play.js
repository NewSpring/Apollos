import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps}>
    <Svg.Path
      d="M125 478l0-441c0-3 1-4 1-4-2 3-5 6-9 8-5 2-9 3-12 2 0 0 1 1 3 2l274 214c5 4 5 5 0 9l-272 202c-2 2-4 2-4 2 3-1 7 0 12 2 4 2 6 5 8 8 0 0-1-1-1-4z m-40 0c0 33 22 44 49 24l272-202c26-19 27-52 1-72l-274-214c-26-21-48-11-48 23z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
