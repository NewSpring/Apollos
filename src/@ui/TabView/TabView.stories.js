import React from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import TabView, { SceneMap } from './';

const FirstRoute = () => <View style={[{ flex: 1, backgroundColor: '#ff4081' }]} />;
const SecondRoute = () => <View style={[{ flex: 1, backgroundColor: '#673ab7' }]} />;

storiesOf('TabView', module)
  .add('default', () => (
    <View style={StyleSheet.absoluteFill}>
      <TabView
        routes={[
          { key: 'first', title: 'First' },
          { key: 'second', title: 'Second' },
        ]}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
      />
    </View>
  ));
