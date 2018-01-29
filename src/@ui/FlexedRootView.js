import { View } from 'react-native';
import styled from '@ui/styled';

const FlexedRootView = styled(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.default,
}), 'FlexedRootView')(View);

export default FlexedRootView;
