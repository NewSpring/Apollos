import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M6.24 5.7l.52-1.23C7.18 3.67 8.2 3 9.1 3h5.8c1 0 2 .65 2.34 1.47l.52 1.23H20c1.16 0 2.06.86 2 1.88V19.1c.06 1.12-.84 1.97-2 1.9H4c-1.07.07-1.97-.78-2-1.9V7.6c.03-1.03.92-1.87 2-1.88h2.24zm2.17-.58l-.7 1.7-.22.5H4.02c-.16 0-.3.13-.3.28v11.58c0 .14.14.26.3.26h16.02c.16 0 .3-.1.3-.26V7.6c0-.14-.14-.27-.3-.27H16.6l-.2-.5-.72-1.7c-.1-.26-.5-.5-.78-.5H9.18c-.28 0-.67.25-.77.5zm3.65 12.16c-2.68 0-4.86-2.06-4.86-4.6 0-2.53 2.17-4.6 4.85-4.6 2.7 0 4.87 2.07 4.87 4.6 0 2.54-2.17 4.6-4.86 4.6zm0-1.62c1.74 0 3.15-1.33 3.15-2.97 0-1.67-1.42-3-3.16-3-1.74 0-3.15 1.33-3.15 3 0 1.62 1.4 2.95 3.13 2.95z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
