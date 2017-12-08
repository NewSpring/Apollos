import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M3 17.27v2.46h2.45c0-1.36-1.1-2.46-2.45-2.46zM3 14v1.64c2.26 0 4.1 1.83 4.1 4.1h1.63C8.73 16.54 6.17 14 3 14zm0-3.27v1.63c4.07 0 7.36 3.3 7.36 7.37H12c0-4.98-4.03-9-9-9zM19.36 5H4.64C3.74 5 3 5.74 3 6.64V9.1h1.64V6.63h14.72V18.1h-5.72v1.63h5.72c.9 0 1.64-.74 1.64-1.64V6.62c0-.9-.74-1.64-1.64-1.64z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
