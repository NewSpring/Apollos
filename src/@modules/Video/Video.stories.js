import React from 'react';
import {
  View,
} from 'react-native';

import { storiesOf } from '@storybook/react-native';

import Video from './';
import ThemeProvider from '../../@primitives/ThemeProvider';
import Play from '../../@primitives/icons/Play';
import Pause from '../../@primitives/icons/Pause';

storiesOf('Video', module)
  .add('renders', () => (
    <ThemeProvider>
      <Video
        source="https://www.w3schools.com/html/mov_bbb.mp4"
      >
        <Video.Play>
          <View>
            <Play />
          </View>
        </Video.Play>

        <Video.Pause>
          <View>
            <Pause />
          </View>
        </Video.Pause>

        <Video.Seeker />
      </Video>
    </ThemeProvider>
  ));

