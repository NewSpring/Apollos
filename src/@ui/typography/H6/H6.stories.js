import React from 'react';

import { storiesOf } from '@storybook/react-native';


import H6 from './';

storiesOf('@ui/typography', module)
  .add('H6', () => (
    <H6>{'"Radical obedience to Christ is not easy... It\'s not comfort, not health, not wealth, and not prosperity in this world. Radical obedience to Christ risks losing all these things. But in the end, such risk finds its reward in Christ. And he is more than enough for us." ― David Platt'}</H6>
  ));
