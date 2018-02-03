import React from 'react';
import { View } from 'react-native';
import Placeholder from 'rn-placeholder';
import styled from '@ui/styled';

export const Media = styled(({ borderRadius, theme, size = '100%' }) => ({
  height: size,
  width: size,
  borderRadius: borderRadius || theme.sizing.borderRadius,
  backgroundColor: theme.colors.background.inactive,
}), 'Placeholder.Media')(({ style }) => (
  <View style={style} />
));

export default Placeholder.connect(Media);
