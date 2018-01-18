import React from 'react';
import { View } from 'react-native';
import Placeholder from 'rn-placeholder';
import styled from '@ui/styled';

export const Line = styled(({ theme, width = '100%' }) => ({
  borderRadius: theme.sizing.borderRadius,
  backgroundColor: theme.colors.background.inactive,
  height: theme.helpers.rem(1),
  width,
  alignSelf: 'stretch',
}), 'Placeholder.Line')(({ style }) => (
  <View style={style} />
));

export default Placeholder.connect(Line);
