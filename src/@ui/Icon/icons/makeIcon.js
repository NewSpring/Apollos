import { withTheme } from '@ui/theme';

// Currently used to inject default fill color to icons.
// Eventually can be used for other shared functionality between icons
const makeIcon = withTheme(({ theme: { primaryColor = null } = {}, fill, ...otherProps } = {}) => ({
  fill: fill || primaryColor,
  ...otherProps,
}));

export default makeIcon;
