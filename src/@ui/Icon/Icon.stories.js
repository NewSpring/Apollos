import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { kebabCase } from 'lodash';

import Icon from './';
import * as icons from './icons';

const stories = storiesOf('Icon', module);

Object.keys(icons).forEach((iconName) => {
  stories.add(iconName, () => <Icon name={kebabCase(iconName)} />);
});
