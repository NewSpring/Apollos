import { View } from 'react-native';
import styled from '@primitives/styled';

const FlexedView = styled(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.screenLight,
}))(View);

export default FlexedView;
