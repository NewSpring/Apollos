import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M12.8 3.621v8.6568h-1.6V3.5545L8.6046 6.224c-.3037.3124-.7962.3124-1.1 0-.3037-.3124-.3037-.819 0-1.1314l3.826-3.9352c.174-.179.41-.2554.637-.2293.227-.026.463.0505.637.2295l3.826 3.9352c.3037.3125.3037.819 0 1.1314-.3038.3125-.7963.3125-1.1 0L12.8 3.621zM8.0338 8v1.5556H6.4012c-.4785 0-.8012.2822-.8012.544v9.8007c0 .2617.3228.544.7997.544h11.2006c.477 0 .7997-.2823.7997-.544v-9.8006c0-.2623-.3216-.544-.796-.544h-1.623V8h1.623C18.927 8 20 8.9403 20 10.0997v9.8006C20 21.06 18.9254 22 17.6003 22H6.3997C5.0744 22 4 21.0597 4 19.9003v-9.8006C4 8.94 5.0743 8 6.4012 8h1.6326z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
