import { DEFAULT_THEME } from '@primitives/constants';
import rem from '@utils/remUnit';

function verticalRhythm(fontSize, relativeValue) {
  const verticalRatio = DEFAULT_THEME.baseLineHeight / DEFAULT_THEME.baseFontSize;
  return rem(verticalRatio * (fontSize * relativeValue));
}

export default verticalRhythm;
