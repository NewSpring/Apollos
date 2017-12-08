import React from 'react';

import { storiesOf } from '@storybook/react-native';

import { ThemeProvider } from '@ui/theme';
import H6 from './';

storiesOf('@ui/typography', module)
  .add('H6', () => (
    <ThemeProvider>
      <H6>{'"Radical obedience to Christ is not easy... It\'s not comfort, not health, not wealth, and not prosperity in this world. Radical obedience to Christ risks losing all these things. But in the end, such risk finds its reward in Christ. And he is more than enough for us." ― David Platt'}</H6>
    </ThemeProvider>
  ));
