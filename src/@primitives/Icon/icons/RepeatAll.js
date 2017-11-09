import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M2 12l3.87-5H22v10H5.87L2 12zm7.5-1.53l.55 1.73h-1.1l.56-1.73zm1.08 3.4h1.1L10.1 9.5H8.94l-1.6 4.38h1.1l.25-.82h1.6l.26.8zm5.47-4.37v4.38h3.1v-.9h-2V9.5h-1.1zm-3.78 0v4.38h3.1v-.9h-2V9.5h-1.1z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
