import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import UIText from './';

storiesOf('typography/UIText', module)
  .add('Default', () => (
    <UIText>{'"True faith means holding nothing back. It means putting every hope in God\'s fidelity to His Promises." ― Francis Chan'}</UIText>
  ))
  .add('Border Box – platform testing', () => {
    const border = { borderWidth: 1 };

    return (
      <View>
        <UIText style={border}>UI Text</UIText>
        <UIText style={border}>{'"True faith means holding nothing back. It means putting every hope in God\'s fidelity to His Promises." ― Francis Chan'}</UIText>
      </View>
    );
  });
