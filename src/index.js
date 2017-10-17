import React from 'react';
import {
  AppRegistry,
  Platform,
  View,
} from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { Router, Route, AndroidBackButton } from './@modules/NativeWebRouter';
import * as pages from './pages';
import ThemeProvider from './@primitives/ThemeProvider';
import FontLoader from './@primitives/FontLoader';
import Store from './redux/Store';

const App = () => (
  <ReduxProvider store={Store}>
    <ThemeProvider>
      <Router>
        <FontLoader>
          <View>
            {Platform.OS === 'android' ? <AndroidBackButton /> : null}
            <Route exact path="/" component={pages.Feed} />
            <Route exact path="/sections" component={pages.Sections} />
          </View>
        </FontLoader>
      </Router>
    </ThemeProvider>
  </ReduxProvider>
);

export default App;

// TODO: It'd be nicer if we could move this using webpack.config.js
if (Platform.OS === 'web') {
  AppRegistry.registerComponent('App', () => App);

  AppRegistry.runApplication('App', {
    rootTag: document.getElementById('root'),
  });
}
