import { DEFAULT_THEME } from '@ui/constants';
import rem from '@utils/remUnit';

function verticalRhythm(fontSize, relativeValue, theme = DEFAULT_THEME) {
  const verticalRatio = theme.baseLineHeight / theme.baseFontSize;
  return rem(verticalRatio * (fontSize * relativeValue));
}

export default verticalRhythm;
