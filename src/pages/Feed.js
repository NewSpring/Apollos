import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Header from '../@modules/Header';
import FooterNav from '../@modules/FooterNav';
import H1 from '../@primitives/H1';
import Umbrella from '../@primitives/icons/Umbrella';
import MediaQuery from '../@primitives/MediaQuery';

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
        <MediaQuery maxWidth={300}>
          <H1>{'A title'}</H1>
        </MediaQuery>
        <MediaQuery minWidth={301}>
          <Umbrella />
        </MediaQuery>

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
