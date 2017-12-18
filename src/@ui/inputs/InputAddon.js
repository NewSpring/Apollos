import { View } from 'react-native';
import styled from '@ui/styled';

const InputAddon = styled({
  justifyContent: 'center',
  alignItems: 'center',
}, 'InputAddon')(View);

export const AddonRow = styled({
  flexDirection: 'row',
  justifyContent: 'center',
}, 'InputWrapper.Row')(View);


export default InputAddon;
