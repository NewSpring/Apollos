import React from 'react';
import {
  AppRegistry,
  Platform,
} from 'react-native';
import { CrossRouter as Router, Route } from './components/Router';
import * as pages from './pages';

console.log(Router);

const App = () => (
  <Router>
    <Route exact path="/" component={pages.Feed} />
  </Router>
);

export default App;

// TODO: It'd be nicer if we could move this using webpack.config.js
if (Platform.OS === 'web') {
  AppRegistry.registerComponent('App', () => App);

  AppRegistry.runApplication('App', {
    rootTag: document.getElementById('root'),
  });
}
