import React from 'react';

import { storiesOf } from '@storybook/react-native';

import ThemeProvider from '@primitives/ThemeProvider';
import P from './';

storiesOf('@primitives/typography', module)
  .add('P', () => (
    <ThemeProvider>
      <P>{'"True faith means holding nothing back. It means putting every hope in God\'s fidelity to His Promises." ― Francis Chan'}</P>
    </ThemeProvider>
  ));
