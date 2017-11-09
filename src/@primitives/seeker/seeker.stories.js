import React from 'react';

import { storiesOf } from '@storybook/react-native';
import ThemeProvider from '../../@primitives/ThemeProvider';
import Seeker from './';

storiesOf('Primitives/Seeker', module)
  .add('Default', () => {
    return (
      <ThemeProvider>
        <Seeker progress={25000} duration={30000} />
      </ThemeProvider>
    );
  });
