/* eslint-disable */
module.exports = (storybookBaseConfig) => {
  storybookBaseConfig.resolve = {
    modules: ['node_modules'],
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
      '@storybook/react-native': '@storybook/react',
    },
  };

  return storybookBaseConfig;
};
