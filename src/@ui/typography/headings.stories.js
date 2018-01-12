import React from 'react';
import { View } from 'react-native';
import { withIsLoading } from '@ui/isLoading';
import { storiesOf } from '@storybook/react-native';

import { H1, H2, H3, H4, H5, H6, H7 } from './';

const SetLoading = withIsLoading(View);

storiesOf('@ui/typography', module)
  .add('headings', () => (
    <View>
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
      <H5>Heading 5</H5>
      <H6>Heading 6</H6>
      <H7>Heading 7</H7>
    </View>
  ))
  .add('placeholders', () => (
    <SetLoading isLoading>
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
      <H5>Heading 5</H5>
      <H6>Heading 6</H6>
      <H7>Heading 7</H7>
    </SetLoading>
  ));
