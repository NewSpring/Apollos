import React from 'react';

import { storiesOf } from '@storybook/react-native';


import H5 from './';

storiesOf('@ui/typography/H5', module)
  .add('Default', () => (
    <H5>{'"Faith does not eliminate questions. But faith knows where to take them." ― Elisabeth Elliot'}</H5>
  ))
  .add('Border Box – platform testing', () => {
    const border = { borderWidth: 1 };

    return (
      <H5 style={border}>Heading 5</H5>
    );
  });
