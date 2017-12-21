import React from 'react';
import { View } from 'react-native';
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
        <CardTile
          number={7}
          title={'Sermon Title'}
          byLine={'Marty McFly'}
          date={'3mo'}
        />
      </View>
    );
  })
  .add('Skeleton', () => {
    const centered = {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: '#f7f7f7',
    };

    return (
      <View style={centered}>
        <CardTile
          number={7}
          title={'Sermon Title'}
          byLine={'Marty McFly'}
          date={'3mo'}
          isLoading
        />
      </View>
    );
  });
