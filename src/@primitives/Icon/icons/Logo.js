import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M12 22C5.2 22 2 17.52 2 12S6.48 2 12 2s10 3.33 10 10v10H12zM7.84 8v9.08h3.12V12.3c0-1.14.6-1.8 1.63-1.8.53 0 1.03.27 1.23.68.17.33.2.5.2 1.4v4.5h3.1v-5.65c0-1.2-.2-1.82-.8-2.45C15.7 8.33 14.86 8 13.8 8H7.84z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
