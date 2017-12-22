import { Text } from 'react-native';
import styled from '@ui/styled';

const UIText = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(1),
  fontFamily: theme.typography.fontFamilySans,
  lineHeight: theme.helpers.verticalRhythm(1, 1),
  color: theme.colors.text.primary,
}), 'UIText')(Text);

export default UIText;
