import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M22 2.83V9.5h-1.67V3.67H14.5V2H22v.83zM21.17 22H22v-7.5h-1.67v5.83H14.5V22h6.67zm-17.5-1.67V14.5H2V22h7.5v-1.67H3.67zM2.83 2H2v7.5h1.67V3.67H9.5V2H2.83z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
