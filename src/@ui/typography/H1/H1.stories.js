import React from 'react';

import { storiesOf } from '@storybook/react-native';

import ThemeProvider from '@ui/ThemeProvider';
import { H1 } from './';

storiesOf('@ui/typography', module)
  .add('H1', () => (
    <ThemeProvider>
      <H1>{'"Do all the good you can. By all the means you can. In all the ways you can. In all the places you can. At all the times you can. To all the people you can. As long as ever you can." ― John Wesley'}</H1>
    </ThemeProvider>
  ));
