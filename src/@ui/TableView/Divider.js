import { View, StyleSheet } from 'react-native';
import styled from '@ui/styled';

const Divider = styled(({ theme }) => ({
  height: StyleSheet.hairlineWidth,
  marginLeft: theme.sizing.baseUnit / 2,
  backgroundColor: theme.colors.shadows.default,
  width: '100%',
}))(View);

export default Divider;
