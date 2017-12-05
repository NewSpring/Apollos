import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M11.83 2C8 2 4 4.96 4 9.83c0 4.6 6.96 11.65 7.22 11.9.17.18.35.27.6.27.27 0 .44-.1.6-.26.28-.26 7.23-7.3 7.23-11.9 0-4.88-4-7.84-7.82-7.84zm0 10.43c-1.48 0-2.6-1.13-2.6-2.6 0-1.48 1.12-2.6 2.6-2.6 1.47 0 2.6 1.12 2.6 2.6 0 1.47-1.13 2.6-2.6 2.6z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
