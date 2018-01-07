import { Text } from 'react-native';
import { compose, pure } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(1.8),
  fontFamily: theme.typography.fontFamilySans,
  lineHeight: theme.helpers.verticalRhythm(1.8, 1.145),
  fontWeight: '700',
  color: theme.colors.text.primary,
}), 'H3');

const H3 = compose(
  styles,
  withPlaceholder(Typography, { width: '100%' }),
  pure,
)(Text);

export default H3;
