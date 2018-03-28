import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 17" {...otherProps}>
    <Svg.Path
      d="M1.3,0 L22.7,0 C23.42,0 24,0.57 24,1.28 L24,15.88 C24,16.58 23.42,17.16 22.7,17.16 L1.3,17.16 C0.57,17.15 0,16.57 0,15.87 L0,1.27 C0,0.57 0.58,0 1.3,0 Z M22.2,15.43 L22.2,1.71 L1.8,1.71 L1.8,15.43 L22.2,15.43 Z M11.4,12 L4.2,12 L4.2,9.7 L11.4,9.7 L11.4,12 Z M19.8,6.86 L4.2,6.86 L4.2,4.57 L19.8,4.57 L19.8,6.87 L19.8,6.86 Z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
