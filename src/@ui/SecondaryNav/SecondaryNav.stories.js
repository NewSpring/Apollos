import React from 'react';

import { storiesOf } from '@storybook/react-native';

import ThemeProvider from '@ui/ThemeProvider';
import { Router } from '../NativeWebRouter';
import SecondaryNav, { Link } from './';


storiesOf('SecondaryNav', module)
  .addDecorator(storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>)
  .addDecorator(storyFn => <Router>{storyFn()}</Router>)
  .add('default with back button', () => <SecondaryNav />)
  .add('custom links', () => (
    <SecondaryNav>
      <Link icon="building" label="Building" to={''} />
      <Link icon="filter" label="Filter" to={''} />
    </SecondaryNav>
  ))
  .add('custom links, no back button', () => (
    <SecondaryNav backButton={false}>
      <Link icon="building" label="Building" to={''} />
      <Link icon="filter" label="Filter" to={''} />
    </SecondaryNav>
  ));
