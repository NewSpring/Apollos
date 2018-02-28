import React from 'react';
import { storiesOf } from '@storybook/react-native';

import AudioBanner from './';

storiesOf('AudioBanner', module)
  .add('Default', () => <AudioBanner />)
  .add('Custom title', () => <AudioBanner titleText={'Listen to Sermon'} />);
