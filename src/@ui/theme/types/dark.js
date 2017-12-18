import Color from 'color';

const dark = ({ colors, alpha }) => ({
  colors: {
    text: {
      primary: colors.lightPrimary,
      secondary: colors.lightSecondary,
      tertiary: colors.lightTertiary,
      link: colors.primary,
    },
    background: {
      default: colors.darkPrimary,
      primary: colors.primary,
      accent: Color(colors.darkTertiary).fade(alpha.high),
      inactive: colors.darkTertiary,
      overlay: Color(colors.darkTertiary).fade(alpha.high),
    },
    shadows: {
      default: colors.black,
    },
    input: {
      // todo
      placeholder: colors.lightTertiary,
    },
    action: {
      default: colors.darkTertiary,
      primary: colors.primary,
      secondary: colors.secondary,
      tertiary: colors.tertiary,
    },
  },
});

export default dark;
