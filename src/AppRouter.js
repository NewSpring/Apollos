import React from 'react';
import { Platform } from 'react-native';
import { Router } from '@ui/NativeWebRouter';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

const history = (Platform.OS === 'web' ? createBrowserHistory() : createMemoryHistory());

const AppRouter = props => (
  <Router {...props} history={history} />
);

export default AppRouter;
