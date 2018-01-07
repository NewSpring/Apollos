import { Text } from 'react-native';
import { compose, pure } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(1.4),
  fontFamily: theme.typography.fontFamilySans,
  lineHeight: theme.helpers.verticalRhythm(1.4, 1.117),
  fontWeight: '700',
  color: theme.colors.text.primary,
}), 'H4');

const H4 = compose(
  styles,
  withPlaceholder(Typography, { width: '80%' }),
  pure,
)(Text);

export default H4;
