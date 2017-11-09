import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M21.8955 19.741l-9.091-16.3178c-.3145-.5643-1.2945-.5643-1.609 0L2.1045 19.741c-.148.2662-.138.5865.0255.8433.1655.2585.46.4157.779.4157h18.182c.319 0 .6136-.1572.778-.4148.1647-.2577.1747-.578.0265-.8442zM12 18.4235c-.5018 0-.909-.3847-.909-.8588 0-.474.4072-.8588.909-.8588.502 0 .909.3845.909.8586 0 .474-.407.8588-.909.8588zm.909-3.4353h-1.818V8.9764h1.818v6.0118z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
