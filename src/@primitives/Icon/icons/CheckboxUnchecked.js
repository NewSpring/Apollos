import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M3.75 20.25h16.5V3.75H3.75v16.5zM1 3.75C1 2.22 2.23 1 3.74 1h16.52C21.76 1 23 2.23 23 3.74v16.52c0 1.5-1.23 2.74-2.74 2.74H3.74C2.24 23 1 21.77 1 20.26V3.74z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
