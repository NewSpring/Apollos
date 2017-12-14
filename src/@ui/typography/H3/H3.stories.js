import React from 'react';

import { storiesOf } from '@storybook/react-native';

import { ThemeProvider } from '@ui/theme';
import H3 from './';

storiesOf('@ui/typography', module)
  .add('H3', () => (
    <ThemeProvider>
      <H3>{'"The Christian shoemaker does his duty not by putting little crosses on the shoes, but by making good shoes, because God is interested in good craftsmanship." ― Martin Luther'}</H3>
    </ThemeProvider>
  ));
