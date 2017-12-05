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

const sizing = {
  baseUnit: 20,
  borderRadius: 6,
};

/**
 *
 * @param {*} theme settings
 * @param {*} existing theme, will compose/extend the existing theme instead of defaults
 */
const createTheme = ({
  colors: colorsInput = {},
  typography: typographyInput = {},
  ...other
} = {}) => ({
  colors: createColors(colorsInput),
  typography: createTypography(typographyInput),
  breakpoints,
  ...merge({
    breakpoints,
    sizing,
  }, other),
});

export const THEME_PROPS = {
  colors: PropTypes.shape(COLORS_PROPS),
  typography: PropTypes.shape(TYPOGRAPHY_PROPS),
  breakpoints: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
  }),
  sizing: PropTypes.shape({
    baseUnit: PropTypes.number,
  }),
  overrides: PropTypes.object,
};

export default createTheme;
