import React from 'react';

import { storiesOf } from '@storybook/react-native';
import FlexedView from '@ui/FlexedView';

import ScheduleCard from './';

storiesOf('ScheduleCard', module)
  .add('default', () => (
    <FlexedView>
      <ScheduleCard
        accountName="General Fund"
        amount={2.22}
        frequency="One Time"
        startDate="2018-01-18T00:00:00.000Z"
      />
    </FlexedView>
  ));
