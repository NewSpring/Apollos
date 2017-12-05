import React from 'react';

import { storiesOf } from '@storybook/react-native';

import ThemeProvider from '@ui/ThemeProvider';
import Header from '@ui/Header';

storiesOf('Header', module)
  .add('renders', () => (
    <ThemeProvider>
      <Header titleText="Welcome!" />
    </ThemeProvider>
  ));

