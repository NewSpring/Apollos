import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';

import VideoPlayer from './';

const videoUrl = 'https://secure-cf-c.ooyala.com/lnN3RmZDE6A5wfMQi8_l0MTUipc8acil/DOcJ-FxaFrRg4gtDEwOjI5cDowODE7AZ';

storiesOf('VideoPlayer', module)
  .add('Default', () => (
    <View style={{ width: '100%', aspectRatio: 16 / 9 }}>
      <VideoPlayer
        src={videoUrl}
      />
    </View>
  ))
  .add('Autoplay', () => (
    <View style={{ width: '100%', aspectRatio: 16 / 9 }}>
      <VideoPlayer
        shouldPlay
        src={videoUrl}
      />
    </View>
  ));
