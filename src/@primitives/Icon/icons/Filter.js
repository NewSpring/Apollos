import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M14.07 18.6c0-.42-.33-.75-.74-.75h-2.66c-.4 0-.74.33-.74.74 0 .4.33.7.74.7h2.66c.4 0 .74-.35.74-.76zM2.74 7.47h18.52c.4 0 .74-.33.74-.74 0-.4-.33-.74-.74-.74H2.74c-.4 0-.74.3-.74.7 0 .4.33.73.74.73zm15.8 5.2c0-.42-.32-.75-.73-.75H6.2c-.42 0-.75.33-.75.74 0 .4.33.74.74.74h11.6c.4 0 .7-.32.7-.73z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
