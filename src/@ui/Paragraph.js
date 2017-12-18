import { View } from 'react-native';
import styled from '@ui/styled';

const Paragraph = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 2,
}))(View);

export default Paragraph;
