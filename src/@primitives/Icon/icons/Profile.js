import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-3.33 8.33C8.67 8.5 10.2 7 12 7s3.33 1.5 3.33 3.33v.84c0 1.84-1.53 3.33-3.33 3.33S8.67 13 8.67 11.17v-.84zm3.33 10c-2.03 0-3.9-.73-5.33-1.93.7-1.32 2.07-2.23 3.66-2.23h3.34c1.6 0 2.97.9 3.66 2.22-1.44 1.2-3.3 1.92-5.33 1.92z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
