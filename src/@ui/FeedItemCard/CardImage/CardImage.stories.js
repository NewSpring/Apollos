import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import CardImage from './';

storiesOf('@primitives/FeedItemCard/CardImage', module)
  .add('Default', () => {
    const centered = {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: '#f7f7f7',
    };

    return (
      <View style={centered}>
        <CardImage source={'https://picsum.photos/600/400/?random'} overlayColor={'#ffffff'} />
      </View>
    );
  });
