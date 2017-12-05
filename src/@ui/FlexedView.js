import { View } from 'react-native';
import styled from '@ui/styled';

const FlexedView = styled(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.screenLight,
}))(View);

export default FlexedView;
