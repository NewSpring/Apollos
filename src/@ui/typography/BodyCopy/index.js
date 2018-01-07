import { Text } from 'react-native';
import { compose, pure } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(1),
  lineHeight: theme.helpers.verticalRhythm(1, 1),
  fontFamily: theme.typography.fontFamilySerif,
  color: theme.colors.text.primary,
}), 'BodyCopy');

const BodyCopy = compose(
  styles,
  withPlaceholder(Typography),
  pure,
)(Text);

export default BodyCopy;
