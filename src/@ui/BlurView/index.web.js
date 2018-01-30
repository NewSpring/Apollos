import { View } from 'react-native';

import styled from '@ui/styled';

// Basic support for Expo's BlurView component
// Currently only supports the 'intensity prop'
export default styled(({
  intensity = 10,
}) => ({
  // intensity * 0.3 = non-exact approximation of the intensity setting in BlurView
  WebkitFilter: `blur(${intensity * 0.3}px)`,
  filter: `blur(${intensity * 0.3}px)`,
}))(View);
