import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Header from '../@modules/Header';
import FooterNav from '../@modules/FooterNav';
import H1 from '../@primitives/H1';
import Umbrella from '../@primitives/icons/Umbrella';
import { Desktop, Mobile } from '../@primitives/MediaQuery';

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
