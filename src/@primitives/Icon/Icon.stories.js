import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Icon from './';

storiesOf('Icon', module)
  .add('Pause', () => <Icon name="pause" />)
  .add('SkipNext', () => <Icon name="skip-next" fill="green" />);
