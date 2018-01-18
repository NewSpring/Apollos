import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Header from '@ui/Header';

storiesOf('Header', module)
  .add('renders', () => (
    <Header titleText="Welcome!" />
  ));

