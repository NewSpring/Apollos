import { View } from 'react-native';
import styled from '@primitives/styled';

const FlexedView = styled(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.screenLightColor,
}))(View);

export default FlexedView;
