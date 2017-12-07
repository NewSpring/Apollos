const dark = ({ colors }) => ({
  colors: {
    text: {
      primary: colors.lightPrimary,
      secondary: colors.lightSecondary,
      tertiary: colors.lightTertiary,
    },
    background: {
      default: colors.darkPrimary,
      overlay: 'rgba(48,48,48,0.8)',
      // todo
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
