import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import RelatedContentCard from './RelatedContentCard';

storiesOf('@ui/RelatedContent/Card', module)
  .add('Default', () => {
    const container = {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#f7f7f7',
    };

    return (
      <View style={container}>
        <RelatedContentCard
          title={'Why Jesus is Timeless'}
          image={'https://picsum.photos/400/400/?random'}
          category={'Time Travel'}
        />
      </View>
    );
  })
  .add('Skeleton', () => {
    const container = {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#f7f7f7',
    };

    return (
      <View style={container}>
        <RelatedContentCard
          title={'Why Jesus is Timeless'}
          image={'https://picsum.photos/400/400/?random'}
          category={'Time Travel'}
          isLoading
        />
      </View>
    );
  });
