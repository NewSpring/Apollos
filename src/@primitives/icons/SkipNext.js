import React from 'react';
import { Svg } from '../Svg';
import { DEFAULT_THEME } from '../constants';

export default ({ size = 32, fill = DEFAULT_THEME.primaryColor } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512">
    <Svg.Path
      d="M297 473l0-430c0-3 0-4 0-4-2 4-6 9-13 12-6 2-12 2-17 0 0 0 1 1 4 3l186 187c8 8 8 21 0 30l-187 191c-2 2-4 3-3 3 4-2 10-2 17 0 7 3 11 8 13 12 0 1 0-1 0-4z m-41 0c0 34 19 42 43 17l188-191c23-24 23-63-1-87l-186-187c-25-24-44-15-44 18z m-215 0l0-430c0-3 0-4 0-4-2 4-6 9-13 12-7 3-14 2-18 0 0 0 1 1 3 4l189 195c7 8 7 21-1 29l-186 183c-2 2-3 3-3 3 4-2 10-2 17 1 6 3 10 7 12 11 0 0 0-1 0-4z m-41 0c0 34 20 42 44 18l186-182c24-24 24-63 1-88l-188-195c-24-24-43-16-43 17z"
      fill={fill}
    />
  </Svg>
);
