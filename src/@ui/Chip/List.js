import { View } from 'react-native';
import styled from '@ui/styled';

const ChipList = styled({
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  maxWidth: '100%',
}, 'Chip.List')(View);

export default ChipList;
