import Color from 'color';

const dark = ({ colors, alpha }) => ({
  colors: {
    text: {
      primary: colors.lightPrimary,
      secondary: colors.lightSecondary,
      tertiary: colors.lightTertiary,
      appHeader: colors.darkPrimary,
    },
    background: {
      default: colors.darkPrimary,
      primary: colors.primary,
      inactive: colors.darkTertiary,
      overlay: Color(colors.darkTertiary).fade(alpha.high),
    },
    shadows: {
      default: colors.black,
    },
    input: {
      // todo
    },
    action: {
      // todo
    },
  },
});

export default dark;
