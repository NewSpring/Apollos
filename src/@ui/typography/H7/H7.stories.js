import React from 'react';

import { storiesOf } from '@storybook/react-native';


import H7 from './';

storiesOf('@ui/typography', module)
  .add('H7', () => (
    <H7>{'"We may speak about a place where there are no tears, no death, no fear, no night; but those are just the benefits of heaven. The beauty of heaven is seeing God." ― Max Lucado'}</H7>
  ));
