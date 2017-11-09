import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps}>
    <Svg.Path
      d="M256 51c113 0 205 92 205 205 0 113-92 205-205 205-113 0-205-92-205-205 0-113 92-205 205-205z m0-51c-141 0-256 115-256 256 0 141 115 256 256 256 141 0 256-115 256-256 0-141-115-256-256-256z m109 188l-41-41-68 68-68-68-41 41 68 68-68 68 41 41 68-68 68 68 41-41-68-68z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
