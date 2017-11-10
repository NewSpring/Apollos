import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M9 11.18h6.4V8.73c0-.9-.3-1.68-.94-2.32-.62-.6-1.38-.9-2.26-.9-.88 0-1.64.3-2.26.97C9.3 7.1 9 7.87 9 8.77v2.45zm10.4 1.23v7.4c0 .37-.12.66-.35.9-.23.24-.52.36-.85.36h-12c-.33 0-.62-.1-.85-.35-.23-.24-.35-.53-.35-.87v-7.4c0-.32.12-.6.35-.85.23-.24.52-.36.85-.36h.4V8.74c0-1.57.55-2.92 1.65-4.04C9.35 3.5 10.67 3 12.2 3c1.53 0 2.85.56 3.95 1.7 1.1 1.1 1.65 2.46 1.65 4.03v2.45h.4c.33 0 .62.12.85.36.23.24.35.53.35.87z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
