import React from 'react';
import { ScrollView } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import H1 from './';

storiesOf('@ui/typography/H1', module)
  .add('Default', () => (
    <ScrollView>
      <H1>{'"Do all the good you can. By all the means you can. In all the ways you can. In all the places you can. At all the times you can. To all the people you can. As long as ever you can." ― John Wesley'}</H1>
    </ScrollView>
  ))
  .add('Border Box – platform testing', () => {
    const border = { borderWidth: 1, borderStyle: 'solid' };

    return (
      <ScrollView>
        <H1 style={border}>Heading 1</H1>
        <H1 style={border}>{'"Do all the\ngood you can.\nBy all the means you can. In all the ways you can. In all the places you can. At all the times you can. To all the people you can. As long as ever you can." ― John Wesley'}</H1>
      </ScrollView>
    );
  });
