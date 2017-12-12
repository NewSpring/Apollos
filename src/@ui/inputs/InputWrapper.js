import { View } from 'react-native';
import styled from '@ui/styled';
const InputWrapper = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit,
}), 'InputWrapper')(View);

export default InputWrapper;
