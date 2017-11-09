import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M19.5 21v-8.25h.75c.45 0 .75.3.75.75v6.75c0 .45-.3.75-.75.75h-.75zm-15-.75V21h-.75c-.45 0-.75-.3-.75-.75V13.5c0-.45.3-.75.75-.75h.75v7.5zM17.25 3c.45 0 .75.3.75.75v16.5c0 .45-.3.75-.75.75h-4.5v-3h-1.5v3h-4.5c-.45 0-.75-.3-.75-.75V3.75c0-.45.3-.75.75-.75h10.5zM10.5 15.75v-1.5H8.25v1.5h2.25zm0-3v-1.5H8.25v1.5h2.25zm0-3v-1.5H8.25v1.5h2.25zm0-3v-1.5H8.25v1.5h2.25zm5.25 9v-1.5H13.5v1.5h2.25zm0-3v-1.5H13.5v1.5h2.25zm0-3v-1.5H13.5v1.5h2.25zm0-3v-1.5H13.5v1.5h2.25z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
