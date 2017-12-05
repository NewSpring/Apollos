import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M13 13.34l3.2-3.2c.4-.4 1.04-.4 1.43 0 .4.38.4 1 0 1.4l-4.92 4.92c-.2.2-.46.3-.73.3s-.54-.1-.75-.3l-4.9-4.92c-.4-.4-.4-1.02 0-1.4.38-.4 1.02-.4 1.4 0L11 13.4V3.02c0-.57.44-1.02 1-1.02.55 0 1 .45 1 1v10.34zm-9 .7v5.93c0 .33.4.7 1 .7h14c.6 0 1-.37 1-.7v-5.94c0-.33 2-1.5 2 0v5.94c0 1.5-1.34 2.7-3 2.7H5c-1.66 0-3-1.2-3-2.7v-5.94c0-1.5 2-.33 2 0z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
