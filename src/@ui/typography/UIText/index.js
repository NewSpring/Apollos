import { Text } from 'react-native';
import { compose, pure } from 'recompose';
import styled from '@ui/styled';
import { withPlaceholder, Typography } from '@ui/Placeholder';

const styles = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(1),
  fontFamily: theme.typography.fontFamilySans,
  lineHeight: theme.helpers.verticalRhythm(1, 1),
  color: theme.colors.text.primary,
}), 'UIText');

const UIText = compose(
  styles,
  withPlaceholder(Typography),
  pure,
)(Text);

export default UIText;
