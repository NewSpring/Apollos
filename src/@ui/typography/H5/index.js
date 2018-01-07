import { Text } from 'react-native';
import { compose, pure } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(1.112),
  fontFamily: theme.typography.fontFamilySans,
  lineHeight: theme.helpers.verticalRhythm(1.112, 1.145),
  fontWeight: '700',
  color: theme.colors.text.primary,
}), 'H5');

const H5 = compose(
  styles,
  withPlaceholder(Typography, { width: '60%' }),
  pure,
)(Text);

export default H5;
