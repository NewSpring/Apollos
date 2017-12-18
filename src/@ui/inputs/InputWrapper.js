import { View } from 'react-native';
import styled from '@ui/styled';

const InputWrapper = styled(({ theme }) => ({
  marginVertical: theme.sizing.baseUnit,
}), 'InputWrapper')(View);

export default InputWrapper;
