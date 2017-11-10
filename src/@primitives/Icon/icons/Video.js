import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M3.8182 5.7778v12.4444H14.2V5.7778H3.8182zM16 6v12c0 1.1046-.8954 2-2 2H4c-1.1046 0-2-.8954-2-2V6c0-1.1046.8954-2 2-2h10c1.1046 0 2 .8954 2 2zm4.1818 2.6952L16 11.8084v.3832l4.1818 3.251V8.695zM16 14.4957V9.4253l6-4.2178v13.585l-6-4.2968z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
