import React from 'react';

import { storiesOf } from '@storybook/react-native';
import Icon from '@ui/Icon';
import { ThemeProvider } from '@ui/theme';
import FlexedView from '@ui/FlexedView';

import Text from './Text';

storiesOf('Inputs', module)
  .add('Text', () => (
    <ThemeProvider>
      <FlexedView>
        <Text
          editable
          label="Some label text"
          placeholder="Some placeholder"
        />
        <Text
          editable
          label="Some label text"
          placeholder="Some placeholder"
          suffix={<Icon name="umbrella" size={18} />}
        />
      </FlexedView>
    </ThemeProvider>
  ));

