import React from 'react';
import { storiesOf } from '@storybook/react-native';

import CardImage from './';

storiesOf('@ui/FeedItemCard/CardImage', module)
  .add('Default', () => (
    <CardImage source={'https://picsum.photos/600/400/?random'} />
  ))
  .add('With Overlay', () => (
    <CardImage source={'https://picsum.photos/600/400/?random'} overlayColor={'salmon'} />
  ));
