import { Text } from 'react-native';
import styled from '@ui/styled';

const LinkText = styled(({ theme }) => ({ color: theme.colors.primary }), 'LinkText')(Text);

export default LinkText;
