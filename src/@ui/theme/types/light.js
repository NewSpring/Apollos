const light = ({ colors }) => ({
  colors: {
    text: {
      primary: colors.darkSecondary, // TODO: should this be darkPrimary?
      secondary: colors.darkSecondary,
      tertiary: colors.darkTertiary,
    },
    background: {
      default: colors.white,
      overlay: 'rgba(48,48,48,0.8)',
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
