import React from 'react';
import { Platform, View } from 'react-native';
import { compose } from 'recompose';
import Placeholder from 'rn-placeholder';

import styled from '@ui/styled';

const enhance = compose(
  Placeholder.connect,
);

const StyledView = styled({
  width: '100%',
  aspectRatio: 1,
  backgroundColor: '#efefef',
  ...Platform.select({
    web: {
      // web doesn't support aspectRatio, this hacks it:
      height: 0,
      paddingTop: '100%',
    },
  }),
})(View);

const SkeletonImage = enhance(() => (
  <StyledView />
));

export default SkeletonImage;
