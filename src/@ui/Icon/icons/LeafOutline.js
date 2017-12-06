import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M12 22h10V12c0-6.67-4.48-10-10-10S2 6.48 2 12s3.2 10 10 10v-1.6c-5.43 0-8.4-3.25-8.4-8.4 0-4.64 3.76-8.4 8.4-8.4 5.1 0 8.4 3.04 8.4 8.4v10l1.6-1.6H12V22z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
