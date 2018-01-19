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

storiesOf('Button', module)
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
  .add('Ghost', () => (
    <FlexedView>
      <ButtonWithMargin
        onPress={() => {}}
        title="Ghost Button"
        bordered
      />
    </FlexedView>
  ))
  .add('Pill', () => (
    <FlexedView>
      <ButtonWithMargin
        onPress={() => {}}
        title="Pill button"
        pill
      />
    </FlexedView>
  ))
  .add('Ghost Pill', () => (
    <FlexedView>
      <ButtonWithMargin
        onPress={() => {}}
        title="Ghost Pill"
        bordered
        pill
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
