import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';


import Card from './';

storiesOf('@primitives/Card', module)
  .add('Default', () => {
    const centered = {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    };

    return (
      <View style={centered}>
        <Card />
      </View>
    );
  });
