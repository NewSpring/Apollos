/* eslint-disable */
module.exports = (storybookBaseConfig) => {
  storybookBaseConfig.entry.preview.unshift('babel-polyfill');
  storybookBaseConfig.resolve = {
    modules: ['node_modules'],
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
      '@storybook/react-native': '@storybook/react',
    }
  };

  storybookBaseConfig.module.rules.push({
    test: /\.css$/,
    loader: 'style-loader!css-loader?url=false'
  });

  return storybookBaseConfig;
};
