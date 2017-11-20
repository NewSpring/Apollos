import { View } from 'react-native';
import styled from '@primitives/styled';

const ModalContainer = styled(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.screenLight,
  overflow: 'hidden',
}))(View);

export default ModalContainer;
