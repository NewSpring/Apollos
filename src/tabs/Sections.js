import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Header from '@modules/Header';
import TileNav from '@modules/TileNav';
import withSections from '@data/withSections';

const TileNavWithSections = withSections(TileNav);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function Sections() {
  return (
    <View style={styles.container}>
      <Header titleText="Sections" />
      <TileNavWithSections />
    </View>
  );
}
