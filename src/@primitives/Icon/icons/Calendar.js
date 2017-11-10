import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M4.4 20.57h15.52V9.14H4.42v11.43zM8.65 7V3.8c0-.12-.03-.2-.1-.27-.06-.07-.15-.1-.25-.1h-.72c-.1 0-.18.03-.25.1s-.1.15-.1.26V7c0 .1.03.2.1.26s.15.1.25.1h.7c.1 0 .2-.04.26-.1.07-.07.1-.16.1-.26zm8.46 0V3.8c0-.12 0-.2-.1-.27 0-.07-.1-.1-.2-.1h-.7c-.1 0-.2.03-.22.1s-.1.15-.1.26V7c0 .1.04.2.1.26.07.06.15.1.25.1h.7c.1 0 .2-.04.26-.1.07-.07.1-.16.1-.26zm4.3-.7v14.27c0 .4-.12.72-.4 1-.26.3-.6.43-1 .43H4.4c-.4 0-.72-.14-1-.42-.28-.3-.42-.62-.42-1V6.28c0-.4.14-.73.42-1 .28-.3.6-.43 1-.43h1.4V3.8c0-.5.17-.93.52-1.28.34-.35.76-.52 1.24-.52h.7c.5 0 .9.17 1.25.52s.55.77.55 1.27v1h4.23v-1c0-.5.17-.97.52-1.3s.75-.5 1.23-.5h.7c.5 0 .9.14 1.25.5.3.34.5.76.5 1.26v1h1.4c.4 0 .7.13 1 .4.23.3.4.63.4 1z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
