import { merge, mapValues } from 'lodash';
import PropTypes from 'prop-types';

import * as defaultTheme from './defaultTheme';

const {
  colors, typography, breakpoints, sizing, type, types, alpha, ...otherThemeDefaults
} = defaultTheme;

// Some parts of the theme are stored as functions (such as `shadows` and `helpers`),
// that depend on the given theme to compute. This processes these parts into objects
// so we can merge a clean object. It's recursive and fairly abstract for flexibility.
export const getDynamicThemePart = (part, theme) => {
  if (typeof part === 'function') return part(theme);
  if (Array.isArray(part)) return part.map(item => getDynamicThemePart(item, theme));
  if (typeof part === 'object') return mapValues(part, value => getDynamicThemePart(value, theme));
  return part;
};

const createTheme = ({
  colors: colorsInput = {},
  typography: typographyInput = {},
  breakpoints: breakpointsInput = {},
  sizing: sizingInput = {},
  type: typeInput = type,
  types: typesInput = {},
  alpha: alphaInput = {},
  ...other
} = {}) => {
  // compose base theme
  const theme = {
    colors: merge({}, colors, colorsInput),
    typography: merge({}, typography, typographyInput),
    breakpoints: merge({}, breakpoints, breakpointsInput),
    sizing: merge({}, sizing, sizingInput),
    alpha: merge({}, alpha, alphaInput),
    type: typeInput,
  };

  // inject theme type
  merge(theme, getDynamicThemePart({ types }, theme));
  merge(theme, getDynamicThemePart({ types: typesInput }, theme));
  const availableTypes = theme.types;
  if (!availableTypes[theme.type]) throw new Error(`The theme type ${theme.type} is not supported`);
  merge(theme, availableTypes[typeInput], { colors: colorsInput });


  // mixin other theme defaults (that might depend on base theme)
  merge(theme, getDynamicThemePart(otherThemeDefaults, theme));

  // mixin other theme inputs (that might depend on base theme)
  merge(theme, getDynamicThemePart(other, theme));
  return theme;
};

export const THEME_PROPS = {
  colors: PropTypes.object,
  typography: PropTypes.object,
  breakpoints: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
  }),
  sizing: PropTypes.object,
  helpers: PropTypes.object,
  overrides: PropTypes.object,
};

export default createTheme;
