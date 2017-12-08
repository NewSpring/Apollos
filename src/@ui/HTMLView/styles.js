import styled from '@ui/styled';
import { Text } from 'react-native';

const Link = styled(({ theme }) => ({
  color: theme.colors.primary,
}), 'HTMLView.Link')(Text);

export { Link };
