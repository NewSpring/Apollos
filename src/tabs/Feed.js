import React from 'react';
import {
  View,
} from 'react-native';
import Header from '@modules/Header';
import H1 from '@primitives/H1';
import Icon from '@primitives/Icon';
import MediaQuery from '@primitives/MediaQuery';
import Audio from '@modules/Audio';

export default function Feed() {
  return (
    <View>
      <Header titleText="NewSpring Church" />
      <MediaQuery minWidth="md">
        <H1>{'A title'}</H1>
      </MediaQuery>
      <MediaQuery maxWidth="md">
        <Icon name="umbrella" />
      </MediaQuery>

      <Audio
        source="https://www.w3schools.com/html/horse.mp3"
      >
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
    </View>
  );
}
