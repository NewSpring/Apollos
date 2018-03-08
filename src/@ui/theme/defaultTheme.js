import * as types from './types';

/**
 * There are two parts to a theme:
 * 1. The `input` that is used to generate a theme,
 * 2. The generated `theme` that is consumed by components
 *
 * The structure of both parts are essentially the same, except
 * with the generated `theme` having more detail.
 *
 * This file exposes the default values that are used in
 * theme generation that you might want to customize.
 *
 * To customize these values, provide theme as options in the `themeInput`
 * prop in <ThemeProvider>, like:
 * <ThemeProvider themeInput={{ colors: { primary: 'blue' }, type: 'dark' }} />
 *
 * For more detail on how to customize a theme, see (TODO: should be on storybook)
 */

// Base colors.
// These get used by theme types (see /types directory) to color
// specific parts of the interface. For more control on how certain
// elements are colored, go there. The next level of control comes
// on a per-component basis with "overrides"
export const colors = {
  // Brand colors
  primary: '#6bac43',
  secondary: '#1c683e',
  tertiary: '#2a4930',
  // Dark shades
  darkPrimary: '#303030',
  darkSecondary: '#505050',
  darkTertiary: '#858585',
  // Light shades
  lightPrimary: '#ffffff',
  lightSecondary: '#f7f7f7',
  lightTertiary: '#dddddd',
  // Statics
  black: '#000000',
  white: '#ffffff',
  transparent: 'transparent',

  alert: '#c64f55',
  wordOfChrist: '#8b0000', // only used in Scripture. TODO: consider theme changes.
};

// Base Typography sizing and fonts.
// To control speicfic styles used on different type components (like H1, H2, etc),
// see "overrides"
export const typography = {
  baseFontSize: 18,
  baseLineHeight: 20,
  fontFamilySans: {
    light: {
      default: 'Colfax-Light',
      italic: 'Colfax-LightItalic',
    },
    regular: {
      default: 'Colfax-Regular',
      italic: 'Colfax-RegularItalic',
    },
    medium: {
      default: 'Colfax-Medium',
      italic: 'Colfax-MediumItalic',
    },
    bold: {
      default: 'Colfax-Bold',
      italic: 'Colfax-BoldItalic',
    },
    black: {
      display: 'Colfax-Black',
      italic: 'Colfax-BlackItalic',
    },
  },
  fontFamilySerif: {
    regular: {
      default: 'DroidSerif-Regular',
      italic: 'DroidSerif-RegularItalic',
    },
    bold: {
      default: 'DroidSerif-Bold',
      italic: 'DroidSerif-BoldItalic',
    },
  },
};

// TODO: Is this even the right naming for this? Could it include anything else?
export const web = {
  backgroundVideo:
    'https://s3.amazonaws.com/ns.images/newspring/fpo/HomepageVideo_ForExport_V3-Web_Hero_2_000kbps.mp4',
  backgroundVideoThumbnail:
    'https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/homepage/hero_poster_2x1_1700_850_90_c1.jpg',
};

// Responsive breakpoints
export const breakpoints = {
  xs: 320,
  sm: 496,
  md: 800,
  lg: 1200,
};

// Base sizing units. These are used to scale
// space, and size components relatively to one another.
export const sizing = {
  baseUnit: 20,
  borderRadius: 6,
  avatar: {
    small: 40,
    medium: 80,
    large: 160,
  },
};

export const alpha = {
  high: 0.9,
  medium: 0.7,
  low: 0.4,
};

/**
 * Dynamic theme parts
 * The sections below define some of the dynamic
 * components to a theme. You can still override them,
 * but if you modify only the values above, the values below
 * will be updated to reflect your customizations.
 */

// The available theme types get included into the theme,
// and the active theme type gets merged into the theme.
// This allows for switching of theme values between different color palettes.
// The theme types included by default are "light" and "dark".
// But, you could add your own theme types (ex: "kids", with a more vibrant set of colors).
// Most of the colors that a component uses should come from the active type, not from the
// base colors above. For example, notice below how `shadows` gets the shadowColor from
// `colors.shadows`, which is provided by the active theme type.
export const type = 'light';
export { types };

export const shadows = ({ colors: themeColors }) => ({
  default: {
    ios: {
      shadowColor: themeColors.shadows.default,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 3,
    },
    android: {
      elevation: 3,
    },
    web: {
      boxShadow: `0 1px 4px ${themeColors.shadows.default}`,
    },
  },
});

export const buttons = ({ colors: themeColors }) => ({
  default: {
    fill: themeColors.action.default,
    accent: themeColors.text.primary,
  },
  primary: {
    fill: themeColors.action.primary,
    accent: themeColors.white,
  },
  secondary: {
    fill: themeColors.action.secondary,
    accent: themeColors.white,
  },
  tertiary: {
    fill: themeColors.action.tertiary,
    accent: themeColors.white,
  },
  ghost: {
    fill: themeColors.text.primary,
    accent: themeColors.text.primary,
  },
  alert: {
    fill: themeColors.alert,
    accent: themeColors.white,
  },
});

// Helpers make it easy to expose simple utils in your theme that rely on the current
// theme to compute its value. They should be a function that takes a single argument -
// the current theme, and returns a function that gets injected into the theme.
export const helpers = {};

helpers.rem = theme => (value) => {
  const fontSize = value * theme.typography.baseFontSize;
  return +fontSize.toFixed(2);
};

helpers.verticalRhythm = theme => (fontSize, relativeValue) => {
  const verticalRatio = theme.typography.baseLineHeight / theme.typography.baseFontSize;
  return helpers.rem(theme)(verticalRatio * (fontSize * relativeValue));
};

// Overrides allow you to override the styles of any component styled using the `styled` HOC.
// For example, this component:
// const SomeComponent = styled({ margin: 10, padding: 20 }, 'SomeComponent');
// can have its styles overriden by including in overrides:
// {
//   overides: {
//     SomeComponent: {
//       margin: 5,
//       padding: 15,
//     },
//   },
// }
export const overrides = {};
