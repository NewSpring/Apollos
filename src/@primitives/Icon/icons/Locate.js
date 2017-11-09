import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M12 8.36C10 8.36 8.36 10 8.36 12S10 15.64 12 15.64 15.64 14 15.64 12 14 8.36 12 8.36zm8.13 2.73c-.43-3.8-3.43-6.8-7.23-7.3V2h-1.8v1.87C7.3 4.3 4.3 7.3 3.9 11.1H2v1.8h1.87c.42 3.8 3.43 6.8 7.22 7.23V22h1.8v-1.87c3.8-.42 6.8-3.43 7.2-7.22H22v-1.8h-1.87zM12 18.3c-3.52 0-6.36-2.84-6.36-6.36 0-3.5 2.84-6.36 6.36-6.36 3.52 0 6.36 2.85 6.36 6.37 0 3.5-2.84 6.35-6.36 6.35z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
