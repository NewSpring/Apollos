import { withProps, nest } from 'recompose';
import { View } from 'react-native';
import withTheme from '../../withTheme';

// Currently used to inject default fill color to icons.
// Eventually can be used for other shared functionality between icons
const makeIcon = withTheme(({ theme: { primaryColor = null } = {}, fill, ...otherProps } = {}) => ({
  fill: fill || primaryColor,
  ...otherProps,
}));

export const iconFromSvgFont = IconComponent => nest(
  withProps({ style: [{ transform: [{ scaleY: -1 }] }] })(View), // svg fonts have flipped y-axis
  makeIcon(IconComponent),
);

export default makeIcon;
