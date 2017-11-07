import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import { iconFromSvgFont } from './makeIcon';

const Icon = iconFromSvgFont(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps}>
    <Svg.Path
      d="M426 142l-59 59c-8 8-8 22 0 31 9 8 23 8 31 0l93-93c5-5 7-10 7-16 0-6-2-12-7-17l-97-90c-8-8-22-8-30 1-9 9-8 23 1 31l54 50-92 0c-34 0-61 19-83 52-15 23 17 60 26 42 20-36 36-50 57-50z m5 271l-53 53c-9 9-9 22 0 31 8 8 22 9 31 0l93-93c4-4 6-10 6-16 0-6-2-12-7-17l-96-90c-9-8-23-7-31 1-8 9-8 23 1 31l60 56-108 0c-32 0-52-30-89-121-21-53-31-75-46-98-23-33-49-52-83-52l-109 0 0 44 109 0c32 0 52 30 89 122 21 52 31 74 46 97 22 33 49 52 83 52z m-322-44c20 0 46-22 64-54 10-19 34 23 19 46-23 33-49 52-83 52l-109 0 0-44z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
