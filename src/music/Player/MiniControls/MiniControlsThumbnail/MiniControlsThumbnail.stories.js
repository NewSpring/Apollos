import React from 'react';
import { storiesOf } from '@storybook/react-native';

import MiniControlsThumbnail from './';

storiesOf('MiniControlsThumbnail', module)
  .add('Default – isPlaying)', () => (
    <MiniControlsThumbnail source={'https://picsum.photos/600/400/?random'} />
  ))
  .add('Close Button – isPaused', () => (
    <MiniControlsThumbnail source={'https://picsum.photos/600/400/?random'} isPlaying={false} />
  ));
