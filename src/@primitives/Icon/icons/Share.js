import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps}>
    <Svg.Path
      d="M256 503c10 0 19-26 19-57l0-152c0-31-9-57-19-57-10 0-19 26-19 57l0 152c0 31 9 57 19 57z m-94-162l0-38-39 0c-11 0-19-6-19-13l0-239c0-6 8-13 19-13l266 0c11 0 19 7 19 13l0 239c0 7-8 13-19 13l-39 0 0 38 39 0c31 0 57-23 57-51l0-239c0-28-26-51-57-51l-266 0c-31 0-57 23-57 51l0 239c0 28 26 51 57 51z m-14 72l93 93c7 8 19 8 27 0 7-7 7-19 0-26l-93-94c-8-7-20-7-27 0-8 8-8 20 0 27z m121 93l94-93c7-7 7-19 0-27-8-7-20-7-27 0l-93 94c-8 7-8 19 0 26 7 8 19 8 26 0z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
