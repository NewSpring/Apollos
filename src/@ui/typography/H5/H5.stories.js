import React from 'react';

import { storiesOf } from '@storybook/react-native';


import H5 from './';

storiesOf('@ui/typography', module)
  .add('H5', () => (
    <H5>{'"Faith does not eliminate questions. But faith knows where to take them." ― Elisabeth Elliot'}</H5>
  ));
