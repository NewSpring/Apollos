import React from 'react';

import { storiesOf } from '@storybook/react-native';

import ThemeProvider from '../../@primitives/ThemeProvider';
import Audio from './';

storiesOf('Audio', module)
  .add('renders', () => (
    <ThemeProvider>
      <Audio source="https://www.w3schools.com/html/horse.mp3" />
    </ThemeProvider>
  ));

