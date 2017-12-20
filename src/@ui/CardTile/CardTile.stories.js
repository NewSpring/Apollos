import React from 'react';
import { View, Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import CardTile from './';

storiesOf('@ui/CardTile', module)
  .add('Default', () => {
    const centered = {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: '#f7f7f7',
    };

    return (
      <View style={centered}>
        <CardTile>
          <Text>Boom!</Text>
        </CardTile>
      </View>
    );
  });
