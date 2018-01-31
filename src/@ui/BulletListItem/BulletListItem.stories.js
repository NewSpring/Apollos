import React from 'react';
import { storiesOf } from '@storybook/react-native';

import PaddedView from '@ui/PaddedView';

import BulletListItem from './';

storiesOf('@ui/BulletListItem', module)
  .add('Default', () => (
    <PaddedView>
      <BulletListItem>
        “God’s work done in God’s way will never lack God’s supplies.” – Hudson Taylor
      </BulletListItem>
    </PaddedView>
  ));
