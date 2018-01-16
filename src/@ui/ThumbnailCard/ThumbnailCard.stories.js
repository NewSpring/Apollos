import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import ThumbnailCard from './';

const containerStyles = {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: '#f7f7f7',
};

storiesOf('@ui/ThumbnailCard', module)
  .add('Default', () => (
    <View style={containerStyles}>
      <ThumbnailCard
        title={'Why Jesus is Timeless'}
      />
    </View>
  ))
  .add('With Image', () => (
    <View style={containerStyles}>
      <ThumbnailCard
        title={'Why Jesus is Timeless'}
        image={'https://picsum.photos/400/400/?random'}
      />
    </View>
  ))
  .add('With Category', () => (
    <View style={containerStyles}>
      <ThumbnailCard
        title={'Why Jesus is Timeless'}
        category={'Time Travel'}
      />
    </View>
  ))
  .add('With Category and Image', () => (
    <View style={containerStyles}>
      <ThumbnailCard
        title={'Why Jesus is Timeless'}
        category={'Time Travel'}
        image={'https://picsum.photos/400/400/?random'}
      />
    </View>
  ))
  .add('Skeleton', () => (
    <View style={containerStyles}>
      <ThumbnailCard
        title={'Why Jesus is Timeless'}
        image={'https://picsum.photos/400/400/?random'}
        category={'Time Travel'}
        isLoading
      />
    </View>
  ));
