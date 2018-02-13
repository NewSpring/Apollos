import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import BodyText from './';

storiesOf('typography/BodyText', module)
  .add('Regular', () => (
    <BodyText>{'"True faith means holding nothing back. It means putting every hope in God\'s fidelity to His Promises." ― Francis Chan'}</BodyText>
  ))
  .add('Bold', () => (
    <BodyText bold>{'"True faith means holding nothing back. It means putting every hope in God\'s fidelity to His Promises." ― Francis Chan'}</BodyText>
  ))
  .add('Italic', () => (
    <BodyText italic>{'"True faith means holding nothing back. It means putting every hope in God\'s fidelity to His Promises." ― Francis Chan'}</BodyText>
  ))
  .add('Bold Italic', () => (
    <BodyText bold italic>{'"True faith means holding nothing back. It means putting every hope in God\'s fidelity to His Promises." ― Francis Chan'}</BodyText>
  ))
  .add('Border Box – platform testing', () => {
    const border = { borderWidth: 1, borderStyle: 'solid' };

    return (
      <View>
        <BodyText style={border}>Body Text</BodyText>
        <BodyText style={border}>{'"True faith means holding nothing\nback. It means putting every\nhope in God\'s fidelity to His Promises." ― Francis Chan'}</BodyText>
      </View>
    );
  });
