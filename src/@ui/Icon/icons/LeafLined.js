import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M18.48 4c.6.46 1.13 1 1.6 1.6H4.3C4.82 5 5.38 4.47 6 4h12.48zm-1.26-.8C15.7 2.4 13.92 2 12 2c-1.72 0-3.34.43-4.75 1.2h9.97zm3.4 3.2c.28.5.53 1.03.74 1.6H2.83c.25-.56.54-1.1.88-1.6h16.9zm1 2.4c.12.5.22 1.04.3 1.6H2.1c.1-.55.23-1.08.4-1.6h19.1zm.36 2.4l.02.8v.8H2.02L2 12c0-.27 0-.54.03-.8h19.95zM22 16v1.6H3.38c-.3-.5-.54-1.04-.73-1.6H22zm0-.8v-1.6H2.1c.06.55.16 1.08.3 1.6H22zm0 4.8v-1.6H3.9c.44.6.96 1.13 1.56 1.6H22zm0 .8V22H12c-2.1 0-3.88-.43-5.3-1.2H22z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
