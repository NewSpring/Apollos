import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';

import EmbeddedVideoPlayer from './';

const embedUrl = 'https://player.ooyala.com/static/v4/production/latest/skin-plugin/iframe.html?ec=h2anlxYzE6G8splCI1Fi-VQciOUJ-fl8&pbid=ZmJmNTVlNDk1NjcwYTVkMzAzODkyMjg0&pcode=&pcode=E1dWM6UGncxhent7MRATc3hmkzUD&skin.config=https%3A%2F%2Fdl.dropbox.com%2Fs%2Fsodcv1d9a4ezwm4%2Fskin.new.json%3Fdl%3D1';

storiesOf('EmbeddedVideoPlayer', module)
  .add('Default', () => (
    <View style={{ width: '100%', aspectRatio: 16 / 9 }}>
      <EmbeddedVideoPlayer
        src={embedUrl}
      />
    </View>
  ));
