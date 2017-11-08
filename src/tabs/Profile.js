import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Header from '@modules/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function Profile() {
  return (
    <View style={styles.container}>
      <Header titleText="Profile" />
    </View>
  );
}
