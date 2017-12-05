import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M13.07 12l7.2-7.2.5-.5c.3-.3.3-.78 0-1.08-.3-.3-.76-.3-1.06 0l-.5.5-7.2 7.2-7.2-7.2-.5-.5c-.3-.3-.77-.3-1.07 0-.3.3-.3.77 0 1.07l.5.5 7.2 7.2-7.7 7.7c-.3.3-.3.77 0 1.07.3.3.77.3 1.07 0l7.7-7.7 7.7 7.7c.3.3.78.3 1.08 0 .3-.3.3-.77 0-1.07l-7.7-7.7z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
