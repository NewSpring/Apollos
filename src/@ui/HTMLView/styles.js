import styled from '@ui/styled';
import { Text } from 'react-native';

const Link = styled(({ theme }) => ({
  color: theme.colors.common.primary,
}), 'HTMLView.Link')(Text);

export { Link };
