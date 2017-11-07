import { compose, withProps } from 'recompose';
import withTheme from '../../withTheme';

// Currently used to inject default fill color to icons.
// Eventually can be used for other shared functionality between icons
const makeIcon = withTheme(({ theme: { primaryColor = null } = {}, fill, ...otherProps } = {}) => ({
  fill: fill || primaryColor,
  ...otherProps,
}));

export const iconFromSvgFont = compose(
  makeIcon,
  withProps(({ style = {} }) => ({
    style: [style, { transform: [{ scaleY: -1 }] }],
    viewBox: '0 0 512 512',
  })),
);

export default makeIcon;
