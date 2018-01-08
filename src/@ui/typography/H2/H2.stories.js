import React from 'react';

import { storiesOf } from '@storybook/react-native';

import H2 from './';

storiesOf('@ui/typography', module)
  .add('H2', () => (
    <H2>{'"God is most glorified in us when we are most satisfied in Him" ― John Piper'}</H2>
  ));
