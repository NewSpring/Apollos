import React from 'react';

import { storiesOf } from '@storybook/react-native';

import ThemeProvider from '@primitives/ThemeProvider';
import H3 from './';

storiesOf('@primitives/typography', module)
  .add('H3', () => (
    <ThemeProvider>
      <H3>{'"The Christian shoemaker does his duty not by putting little crosses on the shoes, but by making good shoes, because God is interested in good craftsmanship." ― Martin Luther'}</H3>
    </ThemeProvider>
  ));
