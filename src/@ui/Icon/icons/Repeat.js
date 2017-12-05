import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M6.22 16.55h11.45l-.3.04c1.32-.5 2.1-1.1 2.52-2 .3-.8.4-1.6.3-2.3l-.1-.2 1.7-.4v.3c.14 1 .05 2.06-.43 3.1-.6 1.33-1.8 2.34-3.56 2.9l-.13.06H6.04l2.9 2.9-1.3 1.3-4.9-4.9.1-.1v-.1l.7-.66v-.1h.1l4.26-3.9 1.22 1.4-2.8 2.62zm11.56-9.1H6.33l.3-.04c-1.32.5-2.1 1.1-2.52 2-.3.8-.4 1.6-.3 2.3l.1.2-1.7.4V12c-.14-1-.05-2.06.43-3.1.6-1.33 1.8-2.34 3.56-2.9l.13-.06H18L15.1 3l1.3-1.3 4.9 4.9-.08.1.08.1-.72.65v.1h-.1l-4.26 3.95-1.25-1.35 2.8-2.62z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
