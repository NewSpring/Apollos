import { AppRegistry, Platform } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { nest, withProps } from 'recompose';
import { ThemeProvider } from '@ui/theme';
import FontLoader from '@ui/FontLoader';
import { ActionSheetProvider } from '@ui/ActionSheet';
import Client from '@data/Client';
import orientation from '@utils/orientation';

import AppRouter from './AppRouter';

const App = nest(
  withProps({ client: Client })(ApolloProvider),
  ThemeProvider,
  FontLoader,
  ActionSheetProvider,
  AppRouter,
);

orientation.allow(orientation.Orientation.PORTRAIT_UP);

export default App;

// TODO: It'd be nicer if we could move this using webpack.config.js
if (Platform.OS === 'web') {
  AppRegistry.registerComponent('App', () => App);

  AppRegistry.runApplication('App', {
    rootTag: document.getElementById('root'),
  });
}
