import { View } from 'react-native';
import styled from '@ui/styled';

const PaddedView = styled(({ theme, horizontal = true, vertical = true }) => ({
  paddingHorizontal: horizontal ? theme.sizing.baseUnit : 0,
  paddingVertical: vertical ? theme.sizing.baseUnit : 0,
}), 'PaddedView')(View);

export default PaddedView;
