import { AppRegistry, Platform } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { nest, withProps } from 'recompose';
import ThemeProvider from '@primitives/ThemeProvider';
import FontLoader from '@primitives/FontLoader';
import Store from '@data/Store';
import Client from '@data/Client';
import AppRouter from './app-router';

const App = nest(
  withProps({ client: Client })(ApolloProvider),
  withProps({ store: Store })(ReduxProvider),
  ThemeProvider,
  FontLoader,
  AppRouter,
);

export default App;

// TODO: It'd be nicer if we could move this using webpack.config.js
if (Platform.OS === 'web') {
  AppRegistry.registerComponent('App', () => App);

  AppRegistry.runApplication('App', {
    rootTag: document.getElementById('root'),
  });
}
