import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';


import H6 from './';

storiesOf('typography/H6', module)
  .add('Default', () => (
    <H6>{'"Radical obedience to Christ is not easy... It\'s not comfort, not health, not wealth, and not prosperity in this world. Radical obedience to Christ risks losing all these things. But in the end, such risk finds its reward in Christ. And He is more than enough for us." ― David Platt'}</H6>
  ))
  .add('Border Box – platform testing', () => {
    const border = { borderWidth: 1, borderStyle: 'solid' };

    return (
      <View>
        <H6 style={border}>Heading 6</H6>
        <H6 style={border}>{'"Radical obedience to Christ is not easy... It\'s not comfort, not health, not wealth, and not prosperity in this world. Radical obedience to Christ risks losing all these things. But in the end, such risk finds its reward in Christ. And He is more than enough for us." ― David Platt'}</H6>
      </View>
    );
  });
