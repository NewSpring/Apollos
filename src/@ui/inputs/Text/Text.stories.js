import React from 'react';

import { storiesOf } from '@storybook/react-native';
import Icon from '@ui/Icon';
import FlexedView from '@ui/FlexedView';

import Text from './';

storiesOf('Inputs', module)
  .add('Text', () => (
    <FlexedView>
      <Text
        editable
        label="Some label text"
        placeholder="Some placeholder"
      />
      <Text
        editable
        type="password"
        label="Password"
        placeholder="Some placeholder"
        suffix={<Icon name="lock" size={18} />}
      />
      <Text
        editable
        type="email"
        label="Email"
        placeholder="Some placeholder"
      />
      <Text
        editable
        type="numeric"
        label="Numeric"
        placeholder="Some placeholder"
      />
      <Text
        editable
        type="phone"
        label="Phone Number"
        placeholder="Some placeholder"
      />
    </FlexedView>
  ));
