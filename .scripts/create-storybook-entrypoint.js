const Path = require('path');
const FS = require('fs');

const content = `
// create-react-native-app requires App.js
import StorybookUI from './src/.storybookNative';

export default StorybookUI;
`;

try {
  FS.writeFileSync(Path.resolve(__dirname, '../App.js'), content);
} catch (err) {
  console.error(err); // eslint-disable-line no-console
}
