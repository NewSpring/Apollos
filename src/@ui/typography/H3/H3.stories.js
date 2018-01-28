import React from 'react';

import { storiesOf } from '@storybook/react-native';


import H3 from './';

storiesOf('@ui/typography/H3', module)
  .add('Default', () => (
    <H3>{'"The Christian shoemaker does his duty not by putting little crosses on the shoes, but by making good shoes, because God is interested in good craftsmanship." ― Martin Luther'}</H3>
  ))
  .add('Border Box – platform testing', () => {
    const border = { borderWidth: 1 };

    return (
      <H3 style={border}>Heading 3</H3>
    );
  });
