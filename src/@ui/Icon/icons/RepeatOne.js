import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M2 12l3.87-5H22v10H5.87L2 12zm7.55-.56v.67c0 .7-.32 1.1-.96 1.1-.7 0-1-.4-1-1.03v-.66c0-.63.3-1.05.93-1.05.63 0 .95.4.95 1.05zm1.1.62v-.57c0-1.2-.7-2-2.06-2-1.4 0-2.1.8-2.1 2v.5c0 1.13.7 2 2.03 2 1.35 0 2.06-.87 2.06-2zm5.5 1.9h3.28v-.9h-2.17v-.87h1.97v-.9h-1.97v-.88h2.17v-.9h-3.28v4.38zm-.9 0V9.6h-1.08v2.54l-1.7-2.55h-1.05v4.3h1.08v-2.5l1.7 2.55h1.05z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
