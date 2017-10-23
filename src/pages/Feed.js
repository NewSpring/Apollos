import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { URL } from '../@utils/Settings';
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

export default class Feed extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Header titleText="NewSpring Church" />
        <Desktop>
          <H1>{'A title'}</H1>
        </Desktop>
        <Mobile>
          <Umbrella />
        </Mobile>

        <H1>Env: {URL}</H1>

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
}
