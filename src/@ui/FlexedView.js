import { View } from 'react-native';
import styled from '@ui/styled';

const FlexedView = styled(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.default,
}), 'FlexedView')(View);

export default FlexedView;
