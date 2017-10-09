const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      '@storybook/react-native': '@storybook/react'
    }
  }
};