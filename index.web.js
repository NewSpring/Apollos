import App from './src/App';
import React from 'react';
import ReactNative, { AppRegistry } from 'react-native';
console.log('hi');
// register the app
AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('react-app')
});