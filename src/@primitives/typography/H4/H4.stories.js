import React from 'react';

import { storiesOf } from '@storybook/react-native';

import ThemeProvider from '@primitives/ThemeProvider';
import H4 from './';

storiesOf('Typography/Headings', module)
  .add('H4', () => (
    <ThemeProvider>
      <H4>{'"Rejection is an opportunity for your selection." ― Bernard Branson'}</H4>
    </ThemeProvider>
  ));
