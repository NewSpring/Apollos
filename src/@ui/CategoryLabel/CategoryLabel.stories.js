import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import Category from './';

storiesOf('@ui/CategoryLabel', module)
  .add('Default', () => {
    const centered = {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    };

    return (
      <View style={centered}>
        <Category type={'Default'} />
      </View>
    );
  })
  .add('Series', () => {
    const centered = {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    };

    return (
      <View style={centered}>
        <Category type={'Series'} />
      </View>
    );
  })
  .add('Albums', () => {
    const centered = {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    };

    return (
      <View style={centered}>
        <Category type={'Albums'} />
      </View>
    );
  });
