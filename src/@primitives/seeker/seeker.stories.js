import React from 'react';

import { storiesOf } from '@storybook/react-native';
import ThemeProvider from '../../@primitives/ThemeProvider';
import Seeker from './';

storiesOf('Primitives/Seeker', module)
  .add('Default', () => {
    let progressState = 7500;
    // setTimeout(() => { progressState = 22500 }, 500);

    return (
      <ThemeProvider>
        <Seeker progress={progressState} duration={30000} />
      </ThemeProvider>
    );
  });
