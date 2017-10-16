import PropTypes from 'prop-types';

export const DEFAULT_THEME = {
  primaryColor: 'green',
  secondaryColor: 'white',
  primaryFont: 'OpenSans',
};

export const THEME_PROPS = {
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  primaryFont: PropTypes.string,
};

export const FONT_DIRECTORY = '../../assets/fonts';
