import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import MediaCard from './';

storiesOf('@primitives/MediaCard/Component', module)
  .add('Default', () => {
    const centered = {
      justifyContent: 'center',
      flex: 1,
      backgroundColor: '#f7f7f7',
    };

    return (
      <View style={centered}>
        <MediaCard
          title={'Promised Land'}
          category={'Series'}
          image={'https://picsum.photos/600/400/?random'}
          isLight
        />
      </View>
    );
  })
  .add('With cardColor', () => {
    const centered = {
      justifyContent: 'center',
      flex: 1,
      backgroundColor: '#f7f7f7',
    };
    return (
      <View style={centered}>
        <MediaCard
          title={'Promised Land'}
          category={'Series'}
          image={'https://picsum.photos/600/400/?random'}
          cardColor={'salmon'}
          isLight={false}
        />
      </View>
    );
  })
  .add('As liked', () => {
    const centered = {
      justifyContent: 'center',
      flex: 1,
      backgroundColor: '#f7f7f7',
    };
    return (
      <View style={centered}>
        <MediaCard
          title={'Promised Land'}
          category={'Series'}
          image={'https://picsum.photos/600/400/?random'}
          isLight
          isLiked
        />
      </View>
    );
  })
  .add('As liked with cardColor', () => {
    const centered = {
      justifyContent: 'center',
      flex: 1,
      backgroundColor: '#f7f7f7',
    };
    return (
      <View style={centered}>
        <MediaCard
          title={'Promised Land'}
          category={'Series'}
          image={'https://picsum.photos/600/400/?random'}
          cardColor={'salmon'}
          isLight={false}
          isLiked
        />
      </View>
    );
  });
