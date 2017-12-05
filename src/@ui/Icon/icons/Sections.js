import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M3 4.5C3 3.67 3.68 3 4.5 3h5.25c.83 0 1.5.68 1.5 1.5v5.25c0 .83-.68 1.5-1.5 1.5H4.5c-.83 0-1.5-.68-1.5-1.5V4.5zm9.75 0c0-.83.68-1.5 1.5-1.5h5.25c.83 0 1.5.68 1.5 1.5v5.25c0 .83-.68 1.5-1.5 1.5h-5.25c-.83 0-1.5-.68-1.5-1.5V4.5zM3 14.25c0-.83.68-1.5 1.5-1.5h5.25c.83 0 1.5.68 1.5 1.5v5.25c0 .83-.68 1.5-1.5 1.5H4.5c-.83 0-1.5-.68-1.5-1.5v-5.25zm9.75 0c0-.83.68-1.5 1.5-1.5h5.25c.83 0 1.5.68 1.5 1.5v5.25c0 .83-.68 1.5-1.5 1.5h-5.25c-.83 0-1.5-.68-1.5-1.5v-5.25z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
