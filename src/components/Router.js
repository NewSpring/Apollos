import {
  Platform,
} from 'react-native';

if (Platform.OS === 'web') {
  console.log('hi');
  const reactRouterDOM = require('react-router-dom');
  module.exports = {
    ...reactRouterDOM,
    CrossRouter: reactRouterDOM.BrowserRouter,
  };
} else {
  const reactRouterNative = require('react-router-native');
  module.exports = {
    ...reactRouterNative,
    CrossRouter: reactRouterNative.NativeRouter,
  };
}

