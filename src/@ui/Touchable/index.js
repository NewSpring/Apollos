import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { defaultProps } from 'recompose';

const IOSTouchable = defaultProps({
  activeOpacity: 0.5,
})(TouchableOpacity);

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : IOSTouchable;

export default Touchable;
