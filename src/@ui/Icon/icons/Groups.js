import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M15.6 4c1.77 0 3.2 1.43 3.2 3.2V8c0 1.77-1.43 3.2-3.2 3.2-.44 0-.85-.1-1.23-.25.28-.66.43-1.4.43-2.15V8c0-1.26-.42-2.4-1.12-3.35.54-.4 1.2-.65 1.92-.65zm-6.4 8.8c-2.2 0-4-1.8-4-4V8c0-2.2 1.8-4 4-4s4 1.8 4 4v.8c0 2.2-1.8 4-4 4zm11.07 1.12c.57.26.93.83.93 1.46v2.22c0 .44-.36.8-.8.8h-2.44c-.17-2.38-1.82-4.4-4.15-5-.3-.08-.6-.14-.9-.2.85-.23 1.77-.4 2.7-.4 1.9 0 3.67.65 4.7 1.12zM15.6 20H2.8c-.44 0-.8-.36-.8-.8v-.38C2 17 3.22 15.4 4.98 14.95c1.18-.3 2.64-.55 4.22-.55 1.58 0 3.04.25 4.22.55 1.76.45 2.98 2.05 2.98 3.87v.38c0 .44-.36.8-.8.8z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
