import React from 'react';
import {
  View,
} from 'react-native';
import Header from '../@modules/Header';
import FooterNav from '../@modules/FooterNav';
import H1 from '../@primitives/H1';
import Umbrella from '../@primitives/icons/Umbrella';
import { Desktop, Mobile } from '../@primitives/MediaQuery';
import Audio from '../@modules/Audio';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function Feed() {
  return (
    <View style={styles.container}>
      <Header titleText="NewSpring Church" />
      <Desktop>
        <H1>{'A title'}</H1>
      </Desktop>
      <Mobile>
        <Umbrella />
      </Mobile>

      <Audio
        source="https://www.w3schools.com/html/horse.mp3"
        onReady={() => { console.log('ready'); }}
        onSeek={console.log}
        onSeeking={console.log}
      />

      <FooterNav>
        <FooterNav.Link
          to="/sections"
          label="sections"
          activeStyle={{ backgroundColor: 'red' }}
        />
        <FooterNav.Link
          to="/"
          label="feed"
          activeStyle={{ backgroundColor: 'red' }}
        />
      </FooterNav>
    </View>
  );
}
