import { Text } from 'react-native';
import styled from '@ui/styled';

const ButtonLink = styled(({ theme }) => ({
  color: theme.colors.text.link,
  textDecorationLine: 'underline',
}), 'Button.Link')(Text);

export default ButtonLink;
