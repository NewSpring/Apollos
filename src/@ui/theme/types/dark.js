import Color from 'color';

const dark = ({ colors, alpha }) => ({
  colors: {
    text: {
      primary: colors.lightPrimary,
      secondary: colors.lightSecondary,
      tertiary: colors.lightTertiary,
    },
    background: {
      default: colors.darkPrimary,
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
