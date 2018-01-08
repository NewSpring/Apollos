import React from 'react';

import { storiesOf } from '@storybook/react-native';
import {
  View,
} from 'react-native';
import Icon from '@ui/Icon';

import Audio from './';

storiesOf('Audio', module)
  .add('renders', () => (
    <Audio source="https://www.w3schools.com/html/horse.mp3">
      <Audio.Play>
        <View>
          <Icon name="play" />
        </View>
      </Audio.Play>

      <Audio.Pause>
        <View>
          <Icon name="pause" />
        </View>
      </Audio.Pause>

      <Audio.Seeker />
    </Audio>
  ));
