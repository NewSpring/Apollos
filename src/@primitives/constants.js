import PropTypes from 'prop-types';

export const DEFAULT_THEME = {
  primaryColor: '#6bac43',
  secondaryColor: '#1c683e',
  terciaryColor: '#2a4930',

  darkPrimaryColor: '#303030',
  darkSecondaryColor: '#505050',
  darkTertiaryColor: '#858585',

  lightPrimaryColor: '#ffffff',
  lightSecondaryColor: '#f7f7f7',
  lightTertiaryColor: '#dddddd',

  alertColor: '#c64f55',
  primaryFont: 'OpenSans',

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
  breakpoints: PropTypes.shape({}),
};
