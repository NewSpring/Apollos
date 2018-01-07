import { Text } from 'react-native';
import { compose, pure } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(0.875),
  fontFamily: theme.typography.fontFamilySans,
  lineHeight: theme.helpers.verticalRhythm(0.875, 1.02),
  fontWeight: '700',
  color: theme.colors.text.primary,
}), 'H6');

const H6 = compose(
  styles,
  withPlaceholder(Typography, { width: '50%' }),
  pure,
)(Text);

export default H6;
