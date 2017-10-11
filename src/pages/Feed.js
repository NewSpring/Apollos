import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Header from '../components/Header';
import FooterNav from '../components/FooterNav';
import H1 from '../components/Junction/H1';

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
        <H1>{'A title'}</H1>

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
