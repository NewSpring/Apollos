import React from 'react';

import { storiesOf } from '@storybook/react-native';

import ThemeProvider from '@primitives/ThemeProvider';
import H2 from './';

storiesOf('Typography/Headings', module)
  .add('H2', () => (
    <ThemeProvider>
      <H2>{'"God is most glorified in us when we are most satisfied in Him" ― John Piper'}</H2>
    </ThemeProvider>
  ));
