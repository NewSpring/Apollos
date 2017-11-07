import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps}>
    <Svg.Path
      d="M201 153c87 0 158 71 158 158 0 87-71 157-158 157-87 0-157-70-157-157 0-87 70-158 157-158z m0-43c-111 0-201 90-201 201 0 111 90 201 201 201 111 0 201-90 201-201 0-111-90-201-201-201z m113 50c-11 11-11 28 0 38 10 11 27 11 38 0l152-152c10-10 10-27 0-38-11-10-28-10-38 0z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
