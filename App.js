// create-react-native-app requires App.js
import Src from './src';
import StorybookUI from './src/.storybookNative';

module.exports = process.env.REACT_NATIVE_IS_STORYBOOK ? StorybookUI : Src;
