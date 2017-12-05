import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm2.2 15.24c-.54.2-2.44 1.13-3.54.16-.33-.3-.5-.66-.5-1.1 0-.83.28-1.56.77-3.3.1-.33.2-.76.2-1.1 0-.58-.23-.73-.83-.73-.3 0-.62.1-.9.2l.15-.65c.65-.27 1.48-.6 2.18-.6 1.06 0 1.84.53 1.84 1.53 0 .3-.05.8-.16 1.15l-.6 2.15c-.1.44-.3 1.4 0 1.68s1.2.13 1.6-.06l-.14.67zm-1-8.57c-.68 0-1.24-.56-1.24-1.25 0-.7.56-1.25 1.25-1.25.7 0 1.3.56 1.3 1.25 0 .7-.55 1.25-1.24 1.25z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
