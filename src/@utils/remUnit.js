import { DEFAULT_THEME } from '@ui/constants';

function rem(value, theme = DEFAULT_THEME) {
  const fontSize = value * theme.baseFontSize;
  return +fontSize.toFixed(2);
}

export default rem;
