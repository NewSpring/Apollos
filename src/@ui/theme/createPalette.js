import { merge } from 'lodash';
import PropTypes from 'prop-types';

export const common = {
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

export const light = {
  text: {
    primary: '#505050',
    secondary: common.darkSecondary,
    tertiary: common.darkTertiary,
    // disabled: 'rgba(0, 0, 0, 0.38)',
    // icon: 'rgba(0, 0, 0, 0.38)',
  },
  background: {
    default: common.white,
    overlay: 'rgba(48,48,48,0.8)',
    // todo
  },
  input: {
    // todo
  },
  action: {
    // todo
  },
};

export const dark = {
  text: {
    primary: common.lightPrimary,
    secondary: common.lightSecondary,
    tertiary: common.lightTertiary,
    // disabled: 'rgba(255, 255, 255, 0.5)',
    // icon: 'rgba(255, 255, 255, 0.5)',
  },
  background: {
    default: common.darkPrimary,
    overlay: 'rgba(48,48,48,0.8)',
    // todo
  },
  input: {
    // todo
  },
  action: {
    // todo
  },
};

const createPalette = ({
  type = 'light',
  ...other
}) => {
  const shades = { dark, light };
  if (!shades[type]) throw new Error(`The palette type ${type} is not supported`);

  return merge({
    ...common,
    shades,
    ...shades[type],
  }, other);
};

const PALETTE_SHADES_PROPS = {
  text: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
    tertiary: PropTypes.string,
    disabled: PropTypes.string,
    icon: PropTypes.string,
  }),
};

export const PALETTE_PROPS = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
  tertiary: PropTypes.string,
  black: PropTypes.string,
  white: PropTypes.string,
  transparent: PropTypes.string,
  error: PropTypes.string,
  ...PALETTE_SHADES_PROPS,
  shades: PropTypes.shape({
    light: PropTypes.shape(PALETTE_SHADES_PROPS),
    dark: PropTypes.shape(PALETTE_SHADES_PROPS),
  }),
};

export default createPalette;
