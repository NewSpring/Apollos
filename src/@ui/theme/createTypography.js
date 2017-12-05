import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { merge } from 'lodash';

const common = {
  baseFontSize: 18,
  baseLineHeight: 20,
  fontFamilySans: null, // force system font
  fontFamilySerif: Platform.OS !== 'android' ? 'Georgia' : 'serif',
};

const rem = ({ baseFontSize }) => (value) => {
  const fontSize = value * baseFontSize;
  return +fontSize.toFixed(2);
};

const verticalRhythm = ({ baseLineHeight, baseFontSize }) => (fontSize, relativeValue) => {
  const verticalRatio = baseLineHeight / baseFontSize;
  return rem({ baseFontSize })(verticalRatio * (fontSize * relativeValue));
};

/**
 * @param {*} typographyInput: custom type styles. See "common" above for values you can set.
 * @param {*} baseTypography: the base styles to use. This prop is used by ThemeMixin, and is used
 * to set what the base typography theme is.
 */
const createTypography = (typographyInput = {}) => {
  // todo: add styles for different typography styles, like H1
  const typography = merge(common, typographyInput);

  const helpers = {
    rem: rem(typography),
    verticalRhythm: verticalRhythm(typography),
  };

  return {
    ...typography,
    ...helpers,
  };
};

export const TYPOGRAPHY_PROPS = {
  baseFontSize: PropTypes.number,
  baseLineHeight: PropTypes.number,
  fontFamilySans: PropTypes.string,
  fontFamilySerif: PropTypes.string,
  rem: PropTypes.func,
  verticalRhythm: PropTypes.func,
};

export default createTypography;
