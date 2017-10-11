import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Header from '../components/Header';
import FooterNav from '../components/FooterNav';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class Sections extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Header titleText="Sections" />
        <FooterNav>
          <FooterNav.Link
            to="/sections"
            label="sections"
          />
          <FooterNav.Link
            to="/"
            label="feed"
          />
        </FooterNav>
      </View>
    );
  }
}
