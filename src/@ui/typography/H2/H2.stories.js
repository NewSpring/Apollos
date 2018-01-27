import React from 'react';

import { storiesOf } from '@storybook/react-native';

import H2 from './';

storiesOf('@ui/typography/H2', module)
  .add('Default', () => (
    <H2>{'"God is most glorified in us when we are most satisfied in Him" ― John Piper'}</H2>
  ))
  .add('Border Box – platform testing', () => {
    const border = { borderWidth: 1 };

    return (
      <H2 style={border}>Heading 2</H2>
    );
  });
