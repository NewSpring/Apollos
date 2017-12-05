import React from 'react';

import { storiesOf } from '@storybook/react-native';

import ThemeProvider from '@ui/ThemeProvider';
import H4 from './';

storiesOf('@ui/typography', module)
  .add('H4', () => (
    <ThemeProvider>
      <H4>{'"What you are is God\'s gift to you, what you become is your gift to God." ― Hans Urs von Balthasar'}</H4>
    </ThemeProvider>
  ));
