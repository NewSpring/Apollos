import React from 'react';

import { storiesOf } from '@storybook/react-native';
import FlexedView from '@ui/FlexedView';

import DashboardSubheader from './';

storiesOf('DashboardSubheader', module)
  .add('default', () => (
    <FlexedView>
      <DashboardSubheader
        text="Title"
        buttonText="action"
      />
    </FlexedView>
  ));
