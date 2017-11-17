import React from 'react';

import { storiesOf } from '@storybook/react-native';

import UIText from './';

storiesOf('@primitives/typography', module)
  .add('UIText', () => (
    <UIText>{'"True faith means holding nothing back. It means putting every hope in God\'s fidelity to His Promises." ― Francis Chan'}</UIText>
  ));
