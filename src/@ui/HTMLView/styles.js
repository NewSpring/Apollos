import styled from '@ui/styled';
import { Text } from 'react-native';

const Link = styled(({ theme }) => ({
  color: theme.colors.text.link,
}), 'HTMLView.Link')(Text);

export { Link };
