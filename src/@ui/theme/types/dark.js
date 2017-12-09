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
      screen: colors.darkPrimary,
      primary: colors.primary,
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
