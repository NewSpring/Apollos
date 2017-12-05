import React from 'react';

import { storiesOf } from '@storybook/react-native';

import ThemeProvider from '@ui/ThemeProvider';
import H5 from './';

storiesOf('@ui/typography', module)
  .add('H5', () => (
    <ThemeProvider>
      <H5>{'"Faith does not eliminate questions. But faith knows where to take them." ― Elisabeth Elliot'}</H5>
    </ThemeProvider>
  ));
