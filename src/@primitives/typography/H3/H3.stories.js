import React from 'react';

import { storiesOf } from '@storybook/react-native';

import ThemeProvider from '@primitives/ThemeProvider';
import H3 from './';

storiesOf('Typography/Headings', module)
  .add('H3', () => (
    <ThemeProvider>
      <H3>{'"What you are is God\'s gift to you, what you become is your gift to God." ― Hans Urs von Balthasar'}</H3>
    </ThemeProvider>
  ));
