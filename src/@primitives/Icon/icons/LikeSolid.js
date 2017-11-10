import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M10.8 4.03l-.03.03h.1c.4.3.8.64 1.13 1.03.33-.4.72-.75 1.14-1.05h.1c-.02 0-.03-.02-.04-.03.97-.66 2.13-1.03 3.3-1.03C19.6 3 22 5.4 22 8.47c0 3.8-3.4 6.88-8.6 11.46l-1.4 1.4-1.4-1.4C5.4 15.36 2 12.27 2 8.48 2 5.38 4.4 3 7.5 3c1.17 0 2.33.37 3.3 1.03z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
