import React from 'react';
import {
  AppRegistry,
  Platform,
  View,
} from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, AndroidBackButton } from '@modules/NativeWebRouter';
import * as pages from 'pages';
import ThemeProvider from '@primitives/ThemeProvider';
import FontLoader from '@primitives/FontLoader';
import Client from '@data/Client';

const App = () => (
  <ApolloProvider client={Client}>
    <ThemeProvider>
      <FontLoader>
        <Router>
          <View style={{ flex: 1 }}>
            {Platform.OS === 'android' ? <AndroidBackButton /> : null}
            <Route exact path="/" component={pages.Feed} />
            <Route exact path="/sections" component={pages.Sections} />
          </View>
        </Router>
      </FontLoader>
    </ThemeProvider>
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
