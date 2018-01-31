import React from 'react';
import { storiesOf } from '@storybook/react-native';

import PaddedView from '@ui/PaddedView';

import BlockQuote from './';

storiesOf('@ui/BlockQuote', module)
  .add('Default', () => (
    <PaddedView>
      <BlockQuote>
        “You are the only Bible some unbelievers will ever read.” – John MacArthur
      </BlockQuote>
    </PaddedView>
  ));
