import { Text } from 'react-native';
import { compose, pure } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(2.35),
  fontFamily: theme.typography.fontFamilySans,
  lineHeight: theme.helpers.verticalRhythm(2.35, 1.145),
  fontWeight: '700',
  color: theme.colors.text.primary,
}), 'H2');

const H2 = compose(
  styles,
  withPlaceholder(Typography, { width: '100%' }),
  pure,
)(Text);

export default H2;
