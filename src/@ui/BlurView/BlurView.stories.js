import React from 'react';
import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import FlexedView from '@ui/FlexedView';

import ConnectedImage from '@ui/ConnectedImage';
import BlurView from './';

storiesOf('BlurView', module)
  .add('default', () => (
    <FlexedView>
      <BlurView intensity={100} style={StyleSheet.absoluteFill}>
        <ConnectedImage style={StyleSheet.absoluteFill} source={'https://picsum.photos/600/400/?image=63'} />
      </BlurView>
    </FlexedView>
  ));
