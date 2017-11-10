import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../Svg';
import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Svg.Path
      d="M4.6 3.64v16.356c0 .004 0 .004-.003.004h14.806c-.004 0-.003 0-.003-.004V3.64c0-.004 0-.004.003-.004H4.597c.004 0 .003 0 .003.004zm-1.6 0C3 2.734 3.717 2 4.597 2h14.806C20.285 2 21 2.734 21 3.64v16.356c0 .906-.717 1.64-1.597 1.64H4.597c-.882 0-1.597-.734-1.597-1.64V3.64zm4 3.27c0 .45.366.817.818.817h8.364c.452 0 .818-.366.818-.818 0-.454-.366-.82-.818-.82H7.818c-.452 0-.818.366-.818.82zm0 4.908c0 .452.366.818.818.818h8.364c.452 0 .818-.366.818-.818 0-.452-.366-.818-.818-.818H7.818c-.452 0-.818.366-.818.818zm0 4.91c0 .45.366.817.818.817h4.764c.452 0 .818-.366.818-.818 0-.452-.366-.818-.818-.818H7.818c-.452 0-.818.364-.818.816z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
