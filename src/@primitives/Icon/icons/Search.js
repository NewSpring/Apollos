import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M20.77 18.56l-3.42-3.42c.82-1.24 1.3-2.72 1.3-4.3 0-4.33-3.5-7.84-7.82-7.84S3 6.5 3 10.83c0 4.3 3.5 7.82 7.83 7.82 1.6 0 3.07-.48 4.3-1.3l3.43 3.42c.3.3.8.3 1.1 0l1.1-1.1c.32-.3.32-.8 0-1.1zm-16.2-7.73c0-3.46 2.8-6.26 6.26-6.26 3.45 0 6.26 2.8 6.26 6.26 0 3.45-2.83 6.26-6.28 6.26-3.46 0-6.26-2.83-6.26-6.28z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
