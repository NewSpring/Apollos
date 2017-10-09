import { getStorybookUI, configure } from '@storybook/react-native';
import { loadStories } from '../.storybook'; // .storybook.js is generated on storybook start

// import stories
configure(() => {
  loadStories();
}, module);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUI = getStorybookUI({ port: 7007, onDeviceUI: true });
export default StorybookUI;
