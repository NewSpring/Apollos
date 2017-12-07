import { merge } from 'lodash';
import PropTypes from 'prop-types';

export const baseCommon = {
  primary: '#6bac43',
  secondary: '#1c683e',
  tertiary: '#2a4930',

  darkPrimary: '#303030',
  darkSecondary: '#505050',
  darkTertiary: '#858585',

  lightPrimary: '#ffffff',
  lightSecondary: '#f7f7f7',
  lightTertiary: '#dddddd',

  black: '#000',
  white: '#fff',
  transparent: 'transparent',
  error: '#c64f55',
};

export const light = ({ common }) => ({
  text: {
    primary: common.darkSecondary, // TODO: should this be darkPrimary?
    secondary: common.darkSecondary,
    tertiary: common.darkTertiary,
  },
  background: {
    default: common.white,
    overlay: 'rgba(48,48,48,0.8)',
    // todo
  },
  shadows: {
    default: common.lightTertiary,
  },
  input: {
    // todo
  },
  action: {
    // todo
  },
});

export const dark = ({ common }) => ({
  text: {
    primary: common.lightPrimary,
    secondary: common.lightSecondary,
    tertiary: common.lightTertiary,
  },
  background: {
    default: common.darkPrimary,
    overlay: 'rgba(48,48,48,0.8)',
    // todo
  },
  shadows: {
    default: common.black,
  },
  input: {
    // todo
  },
  action: {
    // todo
  },
});

/**
 * @param {*} custom colors to use. See COLOR_PROPS below for shape
 * @param {*} the base color theme to inherit from. ThemeMixin uses this.
 */
const createColors = ({
  palette = 'light',
  common: commonInput = {},
  ...other
} = {}) => {
  const common = merge(baseCommon, commonInput);
  const palettes = {
    light: light({ common }),
    dark: dark({ common }),
  };
  if (!palettes[palette]) throw new Error(`The colors palette ${palette} is not supported`);

  return merge({
    common,
    palettes,
    ...palettes[palette],
  }, other);
};

const COLORS_PALETTE_PROPS = {
  text: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
    tertiary: PropTypes.string,
    disabled: PropTypes.string,
    icon: PropTypes.string,
  }),
};

export const COLORS_PROPS = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
  tertiary: PropTypes.string,
  black: PropTypes.string,
  white: PropTypes.string,
  transparent: PropTypes.string,
  error: PropTypes.string,
  ...COLORS_PALETTE_PROPS,
  palettes: PropTypes.shape({
    light: PropTypes.shape(COLORS_PALETTE_PROPS),
    dark: PropTypes.shape(COLORS_PALETTE_PROPS),
  }),
};

export default createColors;
