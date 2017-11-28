import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import Category from './';

storiesOf('@primitives/MediaCard/Category', module)
  .add('Default', () => {
    const centered = {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: '#f7f7f7',
    };

    return (
      <View style={centered}>
        <Category type={'Series'} />
      </View>
    );
  });
