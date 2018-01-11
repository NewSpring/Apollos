import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import RelatedContentCard from './RelatedContentCard';

storiesOf('@ui/RelatedContent/Card', module)
  .add('Default', () => (
    <RelatedContentCard
      title={'Why Jesus is Timeless'}
      image={'https://picsum.photos/200/200/?random'}
      category={'Time Travel'}
    />
  ))
  .add('Skeleton', () => {
    const container = {
      height: 100,
      backgroundColor: '#f7f7f7',
    };

    return (
      <View style={container}>
        <RelatedContentCard
          title={''}
          image={''}
          category={''}
          isLoading
        />
      </View>
    );
  });
