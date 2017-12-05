import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M6.42 8.25H4.58c-.7 0-1.3.57-1.3 1.27v5.1c0 .44.2.73.66.73h3.22v3.78h9.68v-6.45H7.16v2.67h-1.3V11.4h12.27v9.02H5.86v-3.78H3.94C2.77 16.64 2 15.5 2 14.6V9.53c0-1.4 1.16-2.56 2.58-2.56h14.76c1.5 0 2.66 1.15 2.66 2.56v5.1c0 1.14-.87 2-2.03 2.02h-1.84v-1.3h1.84c.44 0 .74-.28.74-.73v-5.1c0-.7-.55-1.27-1.26-1.26h-13zm9.13 6.92v-.74h-7.1v.74h7.1zm0 2.4h-7.1v-.75h7.1v.74zm-8.4-10.6H5.88V3h12.26v3.96h-1.3V4.3H7.17v2.66z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
