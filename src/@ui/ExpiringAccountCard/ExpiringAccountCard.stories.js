import React from 'react';

import { storiesOf } from '@storybook/react-native';
import FlexedView from '@ui/FlexedView';

import ExpiringAccountCard from './';

storiesOf('ExpiringAccountCard', module)
  .add('default', () => (
    <FlexedView>
      <ExpiringAccountCard
        name="Your Amazing Credit Card"
        expirationDate="1/1/20"
      />
    </FlexedView>
  ));
