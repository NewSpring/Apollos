import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';


import H7 from './';

storiesOf('@ui/typography/H7', module)
  .add('Default', () => (
    <H7>{'"We may speak about a place where there are no tears, no death, no fear, no night; but those are just the benefits of heaven. The beauty of heaven is seeing God." ― Max Lucado'}</H7>
  ))
  .add('Border Box – platform testing', () => {
    const border = { borderWidth: 1, borderStyle: 'solid' };

    return (
      <View>
        <H7 style={border}>Heading 7</H7>
        <H7 style={border}>{'"We may speak about a place\nwhere there are no tears,\nno death, no fear, no night; but those are just the benefits of heaven. The beauty of heaven is seeing God." ― Max Lucado'}</H7>
      </View>
    );
  });
