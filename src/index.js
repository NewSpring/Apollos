import setprototypeof from 'setprototypeof';
import { AppRegistry, Platform, StyleSheet, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { nest, withProps } from 'recompose';

import Sentry from '@utils/sentry';
import Settings from '@utils/Settings';

import { ThemeProvider } from '@ui/theme';
import FontLoader from '@ui/FontLoader';
import { ActionSheetProvider } from '@ui/ActionSheet';
import Client from '@data/Client';
import OnboardingModal from '@ui/OnboardingModal';
import orientation from '@utils/orientation';
import trackAppState from '@utils/trackAppState';
import styled from '@ui/styled';

import AppRouter from './AppRouter';
import SentryContext from './SentryContext';

const sentryEnv = Settings.APP_SENTRY_ENVIRONMENT || Settings.NODE_ENV;

if (!Object.setPrototypeOf) Object.setPrototypeOf = setprototypeof;

// expo-sentry doesn't consider NODE_ENV when enabling Sentry,
// however raven-js (sentry's web client) only looks at NODE_ENV when enabling sentry.
// This makes the behavior consistent between the two platforms,
// and continues to be disabled by default when running locally.
Sentry.enableInExpoDevelopment = sentryEnv !== 'development';

Sentry.config(Settings.APP_SENTRY_URL, {
  release: Settings.COMMIT_SHA,
  environment: sentryEnv,
}).install();

const WebLayoutFix = styled({
  ...StyleSheet.absoluteFillObject,
  ...Platform.select({
    web: {
      width: '100vw',
      height: '100vh',
    },
  }),
})(View);

const App = nest(
  WebLayoutFix,
  withProps({ client: Client })(ApolloProvider),
  ThemeProvider,
  FontLoader,
  ActionSheetProvider,
  SentryContext,
  OnboardingModal,
  AppRouter,
);

orientation.allow(orientation.Orientation.PORTRAIT_UP);

trackAppState();

export default App;

// TODO: It'd be nicer if we could move this using webpack.config.js
if (Platform.OS === 'web') {
  AppRegistry.registerComponent('App', () => App);

  AppRegistry.runApplication('App', {
    rootTag: document.getElementById('root'),
  });
}
