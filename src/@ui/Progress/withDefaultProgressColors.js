import Color from 'color';
import { withTheme } from '@ui/theme';

export default withTheme(({ theme, trackColor, color }) => ({
  color: color || theme.colors.secondary,
  trackColor: trackColor || Color(theme.colors.secondary).fade(theme.alpha.high).string(),
}));
