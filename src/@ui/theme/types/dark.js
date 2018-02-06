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
      paper: colors.darkSecondary,
      primary: colors.primary,
      secondary: colors.secondary,
      accent: Color(colors.darkTertiary).fade(alpha.high).string(),
      inactive: colors.darkTertiary,
      overlay: Color(colors.darkTertiary).fade(alpha.high).string(),
      darkOverlay: Color(colors.darkTertiary).fade(alpha.low).string(),
    },
    shadows: {
      default: Color(colors.darkTertiary).fade(alpha.medium).string(),
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
