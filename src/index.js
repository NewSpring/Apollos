import { AppRegistry, Platform } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { nest, withProps } from 'recompose';

import Sentry from '@utils/sentry';
import Settings from '@utils/Settings';

import { ThemeProvider } from '@ui/theme';
import FontLoader from '@ui/FontLoader';
import { ActionSheetProvider } from '@ui/ActionSheet';
import Client from '@data/Client';
import orientation from '@utils/orientation';

import AppRouter from './AppRouter';
import SentryContext from './SentryContext';

const sentryEnv = Settings.APP_SENTRY_ENVIRONMENT || Settings.NODE_ENV;

// expo-sentry disables reporting unless the build was built under NODE_ENV=production.
// However, this isn't always the case, especially on netlify. So, we use
// APP_SENTRY_ENVIRONMENT to determine whether Sentry should run
Sentry.enableInExpoDevelopment = sentryEnv !== 'development';
Sentry.config(Settings.APP_SENTRY_URL, {
  release: Settings.COMMIT_SHA,
  environment: sentryEnv,
  debug: true,
}).install();

const App = nest(
  withProps({ client: Client })(ApolloProvider),
  ThemeProvider,
  FontLoader,
  ActionSheetProvider,
  SentryContext,
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
