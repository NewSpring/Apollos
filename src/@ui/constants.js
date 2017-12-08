import PropTypes from 'prop-types';
import { Platform } from 'react-native';

// Todo: port over values from
// https://github.com/NewSpring/junction-framework/blob/master/lib/_defaults.scss
export const DEFAULT_THEME = {
  primaryColor: '#6bac43',
  secondaryColor: '#1c683e',
  tertiaryColor: '#2a4930',

  darkPrimaryColor: '#303030',
  darkSecondaryColor: '#505050',
  darkTertiaryColor: '#858585',

  lightPrimaryColor: '#ffffff',
  lightSecondaryColor: '#f7f7f7',
  lightTertiaryColor: '#dddddd',

  darkOverlayColor: 'rgba(48,48,48,0.8)',

  alertColor: '#c64f55',

  baseUnit: 20,

  baseFontColor: '#505050',
  baseFontSize: 18,
  baseLineHeight: 20,

  fontFamilySans: null, // force default system font
  fontFamilySerif: Platform.OS !== 'android' ? 'Georgia' : 'serif',

  screenLightColor: '#ffffff',
  screenDarkColor: '#000000',

  cardBorderRadius: 6,

  breakpoints: {
    xs: 320,
    sm: 496,
    md: 800,
    lg: 1200,
  },
};

export const THEME_PROPS = {
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  primaryFont: PropTypes.string,
  breakpoints: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
  }),
};
