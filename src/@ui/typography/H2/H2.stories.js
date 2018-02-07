import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import H2 from './';

storiesOf('typography/H2', module)
  .add('Default', () => (
    <H2>{'"God is most glorified in us when we are most satisfied in Him" ― John Piper'}</H2>
  ))
  .add('Border Box – platform testing', () => {
    const border = { borderWidth: 1, borderStyle: 'solid' };

    return (
      <View>
        <H2 style={border}>Heading 2</H2>
        <H2 style={border}>{'"God is most glorified in us when we are most satisfied in Him" ― John Piper'}</H2>
      </View>
    );
  });
