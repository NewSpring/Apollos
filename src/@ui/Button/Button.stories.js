import React from 'react';
import { View } from 'react-native';
import { nest } from 'recompose';

import { storiesOf } from '@storybook/react-native';
import FlexedView from '@ui/FlexedView';
import { H4 } from '@ui/typography';
import Icon from '@ui/Icon';
import styled from '@ui/styled';

import Button from './';

const ViewWithMargin = styled({ margin: 10 })(View);
const ButtonWithMargin = nest(ViewWithMargin, Button);

storiesOf('Buttons/Pill (default)', module)
  .add('default', () => (
    <FlexedView>
      <ButtonWithMargin
        onPress={() => {}}
        title="Just a plain 'ole Button"
      />
    </FlexedView>
  ))
  .add('Types', () => (
    <FlexedView>
      <ButtonWithMargin
        onPress={() => {}}
        title="Default"
        type="default"
      />
      <ButtonWithMargin
        onPress={() => {}}
        title="Primary Action"
        type="primary"
      />
      <ButtonWithMargin
        onPress={() => {}}
        title="Secondary Action"
        type="secondary"
      />
      <ButtonWithMargin
        onPress={() => {}}
        title="Tertiary Action"
        type="tertiary"
      />
    </FlexedView>
  ))
  .add('Disabled', () => (
    <FlexedView>
      <ButtonWithMargin
        onPress={() => {}}
        title="Disabled Button 😭"
        disabled
      />
    </FlexedView>
  ))
  .add('Bordered', () => (
    <FlexedView>
      <ButtonWithMargin
        onPress={() => {}}
        title="Bordered Button"
        bordered
      />
    </FlexedView>
  ))
  .add('Ghost', () => (
    <FlexedView>
      <ButtonWithMargin
        onPress={() => {}}
        title="Ghost Pill"
        type={'ghost'}
        bordered
      />
    </FlexedView>
  ))
  .add('With Children', () => (
    <FlexedView>
      <ButtonWithMargin onPress={() => {}} type="primary">
        <H4>Non-Text Children</H4>
        <Icon name="like" />
      </ButtonWithMargin>
    </FlexedView>
  ));

storiesOf('Buttons/Square', module)
  .add('default', () => (
    <FlexedView>
      <ButtonWithMargin
        onPress={() => {}}
        title="Just a plain 'ole Square Button"
        pill={false}
      />
    </FlexedView>
  ))
  .add('Types', () => (
    <FlexedView>
      <ButtonWithMargin
        onPress={() => {}}
        title="Default"
        type="default"
        pill={false}
      />
      <ButtonWithMargin
        onPress={() => {}}
        title="Primary Action"
        type="primary"
        pill={false}
      />
      <ButtonWithMargin
        onPress={() => {}}
        title="Secondary Action"
        type="secondary"
        pill={false}
      />
      <ButtonWithMargin
        onPress={() => {}}
        title="Tertiary Action"
        type="tertiary"
        pill={false}
      />
    </FlexedView>
  ))
  .add('Disabled', () => (
    <FlexedView>
      <ButtonWithMargin
        onPress={() => {}}
        title="Disabled Button 😭"
        disabled
        pill={false}
      />
    </FlexedView>
  ))
  .add('Bordered', () => (
    <FlexedView>
      <ButtonWithMargin
        onPress={() => {}}
        title="Bordered Button"
        bordered
        pill={false}
      />
    </FlexedView>
  ))
  .add('Ghost', () => (
    <FlexedView>
      <ButtonWithMargin
        onPress={() => {}}
        title="Ghost Square"
        type={'ghost'}
        bordered
        pill={false}
      />
    </FlexedView>
  ))
  .add('With Children', () => (
    <FlexedView>
      <ButtonWithMargin
        onPress={() => {}}
        type="primary"
        pill={false}
      >
        <H4>Non-Text Children</H4>
        <Icon name="like" />
      </ButtonWithMargin>
    </FlexedView>
  ));
