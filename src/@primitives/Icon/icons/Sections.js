import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} {...otherProps}>
    <Svg.Path
      d="M43 469l0-149c0 0 0 0 0 0l149 0c0 0 0 0 0 0l0 149c0 0 0 0 0 0l-149 0c0 0 0 0 0 0z m-43 0c0 24 19 43 43 43l149 0c24 0 43-19 43-43l0-149c0-24-20-43-43-43l-149 0c-24 0-43 20-43 43z m320 0l0-149c0 0 0 0 0 0l149 0c0 0 0 0 0 0l0 149c0 0 0 0 0 0l-149 0c0 0 0 0 0 0z m-43 0c0 24 20 43 43 43l149 0c24 0 43-19 43-43l0-149c0-24-19-43-43-43l-149 0c-24 0-43 20-43 43z m-234-277l0-149c0 0 0 0 0 0l149 0c0 0 0 0 0 0l0 149c0 0 0 0 0 0l-149 0c0 0 0 0 0 0z m-43 0c0 24 19 43 43 43l149 0c24 0 43-20 43-43l0-149c0-24-20-43-43-43l-149 0c-24 0-43 19-43 43z m320 0l0-149c0 0 0 0 0 0l149 0c0 0 0 0 0 0l0 149c0 0 0 0 0 0l-149 0c0 0 0 0 0 0z m-43 0c0 24 20 43 43 43l149 0c24 0 43-20 43-43l0-149c0-24-19-43-43-43l-149 0c-24 0-43 19-43 43z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
