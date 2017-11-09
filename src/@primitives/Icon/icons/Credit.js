import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M1.7 3.43c-.84 0-1.7.86-1.7 1.7v13.73c0 .85.86 1.7 1.7 1.7h20.6c.84 0 1.7-.85 1.7-1.7V5.14c0-.85-.86-1.7-1.7-1.7H1.7zm0 15.43v-6h20.6v6H1.7zm0-10.65V5.16h20.6V8.2H1.7z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
