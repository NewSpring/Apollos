// create-react-native-app requires App.js
import Src from './src';

export default Src;

if (__DEV__) {
	const StorybookUI = require('./storybook');
	module.exports = StorybookUI;
}
