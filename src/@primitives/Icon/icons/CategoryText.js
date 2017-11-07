import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps}>
    <Svg.Path
      d="M59 469l0-426c0 0 0 0 0 0l394 0c0 0 0 0 0 0l0 426c0 0 0 0 0 0l-394 0c0 0 0 0 0 0z m-43 0c0 24 19 43 43 43l394 0c24 0 43-19 43-43l0-426c0-24-19-43-43-43l-394 0c-24 0-43 19-43 43z m128-106c-12 0-21 9-21 21 0 12 9 21 21 21l224 0c12 0 21-9 21-21 0-12-9-21-21-21z m0-128c-12 0-21 9-21 21 0 12 9 21 21 21l224 0c12 0 21-9 21-21 0-12-9-21-21-21z m0-128c-12 0-21 9-21 21 0 12 9 21 21 21l128 0c12 0 21-9 21-21 0-12-9-21-21-21z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
