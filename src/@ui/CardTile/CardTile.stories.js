import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import CardTile from './';

storiesOf('@ui/CardTile', module)
  .add('Default', () => {
    const container = {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f7f7f7',
    };

    return (
      <View style={container}>
        <CardTile
          number={7}
          title={'Sermon Title'}
          byLine={'Marty McFly'}
          date={'10/30/2017'}
        />
      </View>
    );
  })
  .add('Skeleton', () => {
    const container = {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f7f7f7',
    };

    return (
      <View style={container}>
        <CardTile
          number={7}
          title={'Sermon Title'}
          byLine={'Marty McFly'}
          date={'10/30/2017'}
          isLoading
        />
      </View>
    );
  });
