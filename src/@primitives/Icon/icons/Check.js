import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M19.18 6.32l-9.9 9.65-4.46-4.3c-.22-.23-.48-.33-.76-.33-.3 0-.54.1-.76.32-.2.2-.3.43-.3.7 0 .3.1.54.3.73l5.25 5.03c.2.22.44.32.74.32s.53-.1.72-.32l.14-.13L20.7 7.77c.2-.2.3-.43.3-.72 0-.3-.1-.53-.3-.72-.22-.2-.47-.32-.76-.32-.28 0-.54.1-.76.33z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
