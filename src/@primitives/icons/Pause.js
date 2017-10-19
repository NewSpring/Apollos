import React from 'react';
import { Svg } from '../Svg';

export default ({ size = 32, fill = 'red' } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512">
    <Svg.Path
      d="M137 512c12 0 22-10 22-23l0-455c0-12-10-23-22-23-13 0-23 11-23 23l0 455c0 13 10 23 23 23z m227 0c13 0 23-10 23-23l0-455c0-12-10-23-23-23-12 0-23 11-23 23l0 455c0 13 11 23 23 23z"
      fill={fill}
    />
  </Svg>
);
