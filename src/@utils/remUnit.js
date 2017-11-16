import { DEFAULT_THEME } from '@primitives/constants';

function rem(value) {
  const fontSize = value * DEFAULT_THEME.baseFontSize;
  return +fontSize.toFixed(2);
}

export default rem;
