import { withTheme } from '@ui/theme';

// Currently used to inject default fill color to icons.
// Eventually can be used for other shared functionality between icons
const makeIcon = withTheme(({ theme, fill, ...otherProps } = {}) => ({
  fill: fill || theme.palette.primary,
  ...otherProps,
}));

export default makeIcon;
