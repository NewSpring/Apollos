import React from 'react';

import { storiesOf } from '@storybook/react-native';

import ThemeProvider from '@primitives/ThemeProvider';
import Header from '@modules/Header';

storiesOf('Header', module)
  .add('renders', () => (
    <ThemeProvider>
      <Header titleText="Welcome!" />
    </ThemeProvider>
  ));

