import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Header from '../components/Header';

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
      </View>
    );
  }
}
