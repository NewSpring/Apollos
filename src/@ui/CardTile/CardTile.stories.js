import React from 'react';
import { View, Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import CardTile from './';

storiesOf('CardTile', module)
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
          title={'Why Jesus is Timeless'}
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
          showDetails
          byLine={'Marty McFly'}
          date={'Sat Oct 26 1985 01:24:00 GMT+0008 (UTC)'}
          isLoading
        />
      </View>
    );
  })
  .add('With Number Box', () => {
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
        />
      </View>
    );
  })
  .add('With card details', () => {
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
          showDetails
          byLine={'Marty McFly'}
        />
      </View>
    );
  })
  .add('With date', () => {
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
          showDetails
          byLine={'Marty McFly'}
          date={'Sat Oct 26 1985 01:24:00 GMT+0008 (UTC)'} // this snapshot will expire in a year
        />
      </View>
    );
  })
  .add('With Children', () => {
    const container = {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f7f7f7',
    };

    return (
      <View style={container}>
        <CardTile>
          <Text>Biff Tannen was here</Text>
        </CardTile>
      </View>
    );
  });
