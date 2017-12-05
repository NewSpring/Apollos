import { merge } from 'lodash';
import PropTypes from 'prop-types';
import createColors, { COLORS_PROPS } from './createColors';
import createTypography, { TYPOGRAPHY_PROPS } from './createTypography';

const breakpoints = {
  xs: 320,
  sm: 496,
  md: 800,
  lg: 1200,
};

const spacing = {
  baseUnit: 20,
  borderRadius: 6,
};

const createTheme = ({
  colors: colorsInput = {},
  typography: typographyInput = {},
  ...other
} = {}) => {
  const colors = createColors(colorsInput);

  return {
    colors,
    typography: createTypography(colors, typographyInput),
    breakpoints,
    ...merge({
      breakpoints,
      spacing,
    }, other),
  };
};

export const THEME_PROPS = {
  colors: PropTypes.shape(COLORS_PROPS),
  typography: PropTypes.shape(TYPOGRAPHY_PROPS),
  breakpoints: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
  }),
  spacing: PropTypes.shape({
    baseUnit: PropTypes.number,
  }),
  overrides: PropTypes.object,
};

export default createTheme;
