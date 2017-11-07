import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps}>
    <Svg.Path
      d="M161 438c2 7 12 13 19 13l144 0c7 0 16-6 19-13l18-45 6-13 86 0c4 0 7-4 7-7l0-308c0-4-3-7-7-7l-402 0c-4 0-7 3-7 7l0 308c0 4 3 7 7 7l86 0 6 13z m-55-15l-56 0c-27 0-49-23-50-50l0-306c1-29 23-52 50-50l402 0c29-2 51 20 50 50l0 306c1 27-21 50-50 50l-57 0-13 33c-8 21-34 39-58 39l-146 0c-22 0-48-18-59-39z m146-308c67 0 122 55 122 123 0 67-55 122-122 122-67 0-122-55-122-122 0-68 55-123 122-123z m0 44c-44 0-79 35-79 79 0 43 35 79 79 79 44 0 79-36 79-79 0-44-35-79-79-79z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
