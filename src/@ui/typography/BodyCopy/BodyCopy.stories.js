import React from 'react';

import { storiesOf } from '@storybook/react-native';

import BodyCopy from './';

storiesOf('@ui/typography', module)
  .add('BodyCopy', () => (
    <BodyCopy>{'"True faith means holding nothing back. It means putting every hope in God\'s fidelity to His Promises." ― Francis Chan'}</BodyCopy>
  ));
