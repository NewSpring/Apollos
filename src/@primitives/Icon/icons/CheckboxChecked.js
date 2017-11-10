import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M2.57,0 L19.43,0 C20.85,0 22,1.15 22,2.57 L22,19.43 C22,20.85 20.85,22 19.43,22 L2.57,22 C1.15,22 0,20.85 0,19.43 L0,2.57 C0,1.15 1.15,0 2.57,0 Z M17.75,4.56 L8.45,14.38 L4.25,9.98 C4.05,9.78 3.8,9.68 3.53,9.68 C3.26,9.68 3.03,9.78 2.83,9.98 C2.63,10.18 2.53,10.43 2.53,10.72 C2.53,11.02 2.63,11.26 2.83,11.46 L7.76,16.6 C7.94,16.8 8.16,16.92 8.46,16.92 C8.73,16.92 8.96,16.82 9.16,16.6 L9.28,16.47 L19.18,6.02 C19.38,5.82 19.46,5.58 19.46,5.29 C19.46,4.99 19.36,4.73 19.18,4.54 C18.98,4.32 18.74,4.21 18.48,4.21 C18.2,4.21 17.96,4.31 17.75,4.54 L17.75,4.56 Z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
