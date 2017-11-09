import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Header from '@modules/Header';

storiesOf('Header', module)
  .add('renders', () => <Header />);

