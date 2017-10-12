import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Header from './';

storiesOf('Header', module)
  .add('renders', () => <Header />);

