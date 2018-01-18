import { AppRegistry, Platform } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { nest, withProps } from 'recompose';
import { ThemeProvider } from '@ui/theme';
import FontLoader from '@ui/FontLoader';
import Client from '@data/Client';
import AppRouter from './AppRouter';

const App = nest(
  withProps({ client: Client })(ApolloProvider),
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
