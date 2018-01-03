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
          title={'Why Jesus is Timeless'}
          byLine={'Marty McFly'}
          date={'Sat Oct 26 1985 01:24:00 GMT+0008 (UTC)'} // this snapshot will expire in a year
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
          title={'Why Jesus is Timeless'}
          byLine={'Marty McFly'}
          date={'Sat Oct 26 1985 01:24:00 GMT+0008 (UTC)'}
          isLoading
        />
      </View>
    );
  });
