import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M7.63 3.34v17.5c-.04-.12-.17-.25-.35-.33-.18-.06-.37-.1-.5-.04l.14-.1 11.13-8.4c.22-.17.22-.2 0-.36L7 3.65l-.14-.1c.1.03.28.02.45-.07.2-.1.3-.2.36-.3v.13zM6 3.34c0-1.3.88-1.73 1.97-.95l11.05 7.9c1.1.8 1.1 2.06.04 2.86l-11.13 8.4C6.86 22.4 6 22 6 20.7V3.34z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
