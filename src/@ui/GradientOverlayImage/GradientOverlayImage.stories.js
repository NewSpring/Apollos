import React from 'react';
import { storiesOf } from '@storybook/react-native';

import GradientOverlayImage from './';

storiesOf('GradientOverlayImage', module)
  .add('Default', () => (
    <GradientOverlayImage source={'https://picsum.photos/600/400/?random'} />
  ))
  .add('With Overlay', () => (
    <GradientOverlayImage source={'https://picsum.photos/600/400/?random'} overlayColor={'salmon'} />
  ));
