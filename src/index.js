import React from 'react';
import {
  AppRegistry,
  Platform,
  View,
} from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, AndroidBackButton } from './@modules/NativeWebRouter';
import * as pages from './pages';
import ThemeProvider from './@primitives/ThemeProvider';
import FontLoader from './@primitives/FontLoader';
import Store from './redux/Store';
import Client from './apollo/Client';

const App = () => (
  <ApolloProvider client={Client}>
    <ReduxProvider store={Store}>
      <ThemeProvider>
        <FontLoader>
          <Router>
            <View>
              {Platform.OS === 'android' ? <AndroidBackButton /> : null}
              <Route exact path="/" component={pages.Feed} />
              <Route exact path="/sections" component={pages.Sections} />
            </View>
          </Router>
        </FontLoader>
      </ThemeProvider>
    </ReduxProvider>
  </ApolloProvider>
);

export default App;

// TODO: It'd be nicer if we could move this using webpack.config.js
if (Platform.OS === 'web') {
  AppRegistry.registerComponent('App', () => App);

  AppRegistry.runApplication('App', {
    rootTag: document.getElementById('root'),
  });
}
