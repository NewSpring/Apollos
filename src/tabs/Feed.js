import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import Header from '@modules/Header';
import H1 from '@primitives/typography';
import Icon from '@primitives/Icon';
import MediaQuery from '@primitives/MediaQuery';
import Audio from '@modules/Audio';
import { Link } from '@modules/NativeWebRouter';

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

      <Link to="/example-card"><View><Text>Open a new page!</Text></View></Link>

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
