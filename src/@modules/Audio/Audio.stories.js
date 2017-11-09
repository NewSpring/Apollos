import React from 'react';

import { storiesOf } from '@storybook/react-native';
import {
  View,
} from 'react-native';
import Play from '@primitives/icons/Play';
import Pause from '@primitives/icons/Pause';

import ThemeProvider from '@primitives/ThemeProvider';
import Audio from './';

storiesOf('Audio', module)
  // .add('renders', () => (
  //   <ThemeProvider>
  //     <Audio source="https://www.w3schools.com/html/horse.mp3">
  //       <Audio.Play>
  //         <View>
  //           <Play />
  //         </View>
  //       </Audio.Play>
  //
  //       <Audio.Pause>
  //         <View>
  //           <Pause />
  //         </View>
  //       </Audio.Pause>
  //
  //       <Audio.Seeker />
  //     </Audio>
  //   </ThemeProvider>
  // ));
