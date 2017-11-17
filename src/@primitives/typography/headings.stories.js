import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';

import ThemeProvider from '@primitives/ThemeProvider';
import { H1, H2, H3, H4, H5, H6, H7 } from './';

storiesOf('@primitives/typography', module)
  .add('headings', () => (
    <ThemeProvider>
      <View>
        <H1>Heading 1</H1>
        <H2>Heading 2</H2>
        <H3>Heading 3</H3>
        <H4>Heading 4</H4>
        <H5>Heading 5</H5>
        <H6>Heading 6</H6>
        <H7>Heading 7</H7>
      </View>
    </ThemeProvider>
  ));
