import React from 'react';
import {
  AppRegistry,
  Platform,
  View,
} from 'react-native';
import { Router, Route, AndroidBackButton } from './components/NativeWebRouter';
import * as pages from './pages';
import ThemeProvider from './components/Junction/ThemeProvider';

const App = () => (
  <ThemeProvider>
    <Router>
      <View>
        {Platform.OS === 'android' ? <AndroidBackButton /> : null}
        <Route exact path="/" component={pages.Feed} />
        <Route exact path="/sections" component={pages.Sections} />
      </View>
    </Router>
  </ThemeProvider>
);

export default App;

// TODO: It'd be nicer if we could move this using webpack.config.js
if (Platform.OS === 'web') {
  AppRegistry.registerComponent('App', () => App);

  AppRegistry.runApplication('App', {
    rootTag: document.getElementById('root'),
  });
}
