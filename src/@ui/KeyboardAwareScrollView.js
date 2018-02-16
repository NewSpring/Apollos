import { defaultProps } from 'recompose';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default defaultProps({
  enableOnAndroid: true,
  extraHeight: Platform.OS === 'android' ? 150 : 0,
})(KeyboardAwareScrollView);
