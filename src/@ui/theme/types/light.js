import Color from 'color';

const light = ({ colors, alpha }) => ({
  colors: {
    text: {
      primary: colors.darkPrimary,
      secondary: colors.darkSecondary,
      tertiary: colors.darkTertiary,
    },
    background: {
      default: colors.white,
      overlay: Color(colors.darkTertiary).fade(alpha.high),
      // todo
    },
    shadows: {
      default: colors.lightTertiary,
    },
    input: {
      // todo
    },
    action: {
      // todo
    },
  },
});

export default light;
