import React from 'react';

import { storiesOf } from '@storybook/react-native';

import UIText from './';

storiesOf('@ui/typography/UIText', module)
  .add('Default', () => (
    <UIText>{'"True faith means holding nothing back. It means putting every hope in God\'s fidelity to His Promises." ― Francis Chan'}</UIText>
  ))
  .add('Border Box – platform testing', () => {
    const border = { borderWidth: 1 };

    return (
      <UIText style={border}>UI Text</UIText>
    );
  });
