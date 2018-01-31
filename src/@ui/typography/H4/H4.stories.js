import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import H4 from './';

storiesOf('@ui/typography/H4', module)
  .add('Default', () => (
    <H4>{'"What you are is God\'s gift to you, what you become is your gift to God." ― Hans Urs von Balthasar'}</H4>
  ))
  .add('Border Box – platform testing', () => {
    const border = { borderWidth: 1, borderStyle: 'solid' };

    return (
      <View>
        <H4 style={border}>Heading 4</H4>
        <H4 style={border}>{'"What you are is God\'s gift to you, what you become is your gift to God." ― Hans Urs von Balthasar'}</H4>
      </View>
    );
  });
