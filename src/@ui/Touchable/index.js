import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

export default Touchable;
