import React from 'react';

import { storiesOf } from '@storybook/react-native';
import FlexedView from '@ui/FlexedView';

import CashAmountIndicator from './';

storiesOf('CashAmountIndicator', module)
  .add('default', () => (
    <FlexedView>
      <CashAmountIndicator
        amount={2.22}
      />
    </FlexedView>
  ))
  .add('size 2', () => (
    <FlexedView>
      <CashAmountIndicator
        amount={2.22}
        size={2}
      />
    </FlexedView>
  ))
  .add('size 3', () => (
    <FlexedView>
      <CashAmountIndicator
        amount={2.22}
        size={3}
      />
    </FlexedView>
  ))
  .add('size 4', () => (
    <FlexedView>
      <CashAmountIndicator
        amount={2.22}
        size={4}
      />
    </FlexedView>
  ))
  .add('size 5', () => (
    <FlexedView>
      <CashAmountIndicator
        amount={2.22}
        size={5}
      />
    </FlexedView>
  ));
