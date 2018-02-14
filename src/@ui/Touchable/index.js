import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { defaultProps } from 'recompose';

const IOSTouchable = defaultProps({
  delayPressIn: 50,
  activeOpacity: 0.5,
})(TouchableOpacity);

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : IOSTouchable;

export default Touchable;
