import { View } from 'react-native';
import styled from '@ui/styled';

const InputWrapper = styled(({ theme, disabled }) => ({
  marginVertical: theme.sizing.baseUnit,
  ...disabled ? { opacity: 0.5 } : {},
}), 'InputWrapper')(View);

export default InputWrapper;
