import { View } from 'react-native';
import styled from '@ui/styled';

const FlexedView = styled(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.background.default,
}), 'FlexedView')(View);

export default FlexedView;
