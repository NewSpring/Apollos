import React from 'react';
import { View } from 'react-native';
import { nest } from 'recompose';

import { storiesOf } from '@storybook/react-native';
import FlexedView from '@ui/FlexedView';
import styled from '@ui/styled';

import Chip from './';

const ViewWithMargin = styled({ margin: 5 })(View);
const ChipWithMargin = nest(ViewWithMargin, Chip);

storiesOf('Chip', module)
  .add('default', () => (
    <FlexedView style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
      <ChipWithMargin
        onPress={() => {}}
        title="I'm just a poor chip"
      />
      <ChipWithMargin
        onPress={() => {}}
        icon="close"
        title="I need no sympathy"
      />
      <ChipWithMargin
        onPress={() => {}}
        selected
        title="Easy come"
      />
      <ChipWithMargin
        onPress={() => {}}
        icon="close"
        selected
        title="Easy go"
      />
      <ChipWithMargin
        onPress={() => {}}
        icon="arrow-up"
        title="Litte high"
      />
      <ChipWithMargin
        onPress={() => {}}
        type="secondary"
        icon="arrow-down"
        title="Litte low"
      />
      <ChipWithMargin
        title="📍💨?"
      />
      <ChipWithMargin
        selected
        title="¯\_(ツ)_/¯"
      />
    </FlexedView>
  ));

