import React from 'react';
import { View, Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import Icon from '@ui/Icon';
import CategoryLabel from './';

storiesOf('@ui/CategoryLabel', module)
  .add('Default', () => {
    const centered = {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    };

    return (
      <View style={centered}>
        <CategoryLabel label={'Default'} />
      </View>
    );
  })
  .add('Skeleton', () => {
    const centered = {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    };

    return (
      <View style={centered}>
        <CategoryLabel
          label={'Default'}
          isLoading
        />
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
        <CategoryLabel label={'Series'} />
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
        <CategoryLabel label={'Albums'} />
      </View>
    );
  })
  .add('Custom', () => {
    const centered = {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    };

    return (
      <View style={centered}>
        <CategoryLabel
          label={'Albums'}
          icon={'like-solid'}
        />
      </View>
    );
  })
  .add('With children', () => {
    const centered = {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    };

    return (
      <View style={centered}>
        <CategoryLabel label={'Albums'}>
          <Text>Boom</Text>
          <Icon name={'like-solid'} />
        </CategoryLabel>
      </View>
    );
  });
