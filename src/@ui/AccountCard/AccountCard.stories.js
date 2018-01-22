import React from 'react';

import { storiesOf } from '@storybook/react-native';
import FlexedView from '@ui/FlexedView';

import AccountCard from './';

storiesOf('AccountCard', module)
  .add('default', () => (
    <FlexedView>
      <AccountCard
        title="Credit Account"
        accountNumber="411111111111111"
        accountType="creditCard"
      />
      <AccountCard
        title="Bank Account"
        accountNumber="123123123"
        accountType="bankAccount"
      />
    </FlexedView>
  ));
