import React from 'react';

import { storiesOf } from '@storybook/react-native';
import FlexedView from '@ui/FlexedView';

import Chip from './';

storiesOf('Chip', module)
  .add('default', () => (
    <FlexedView style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
      <Chip
        onPress={() => {}}
        title="I'm just a poor chip"
      />
      <Chip
        onPress={() => {}}
        icon="close"
        title="I need no sympathy"
      />
      <Chip
        onPress={() => {}}
        selected
        title="Easy come"
      />
      <Chip
        onPress={() => {}}
        icon="close"
        selected
        title="Easy go"
      />
      <Chip
        onPress={() => {}}
        icon="arrow-up"
        title="Litte high"
      />
      <Chip
        onPress={() => {}}
        type="secondary"
        icon="arrow-down"
        title="Litte low"
      />
      <Chip
        title="📍💨?"
      />
      <Chip
        selected
        title="¯\_(ツ)_/¯"
      />
    </FlexedView>
  ));

