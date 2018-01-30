import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import BodyCopy from './';

storiesOf('@ui/typography/BodyCopy', module)
  .add('Default', () => (
    <BodyCopy>{'"True faith means holding nothing back. It means putting every hope in God\'s fidelity to His Promises." ― Francis Chan'}</BodyCopy>
  ))
  .add('Border Box – platform testing', () => {
    const border = { borderWidth: 1, borderStyle: 'solid' };

    return (
      <View>
        <BodyCopy style={border}>Body Copy</BodyCopy>
        <BodyCopy style={border}>{'"True faith means holding nothing\nback. It means putting every\nhope in God\'s fidelity to His Promises." ― Francis Chan'}</BodyCopy>
      </View>
    );
  });
