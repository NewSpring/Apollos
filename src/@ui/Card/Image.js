import { Platform } from 'react-native';
import { compose, withProps } from 'recompose';

import styled from '@ui/styled';
import ConnectedImage from '@ui/ConnectedImage';

const Image = compose(
  styled(({ theme }) => ({
    width: '100%',
    resizeMode: 'cover',
    ...Platform.select({
      android: { // fixes android borderRadius overflow display issue
        borderTopRightRadius: theme.sizing.borderRadius,
        borderTopLeftRadius: theme.sizing.borderRadius,
      },
      web: {
        // web doesn't support aspectRatio, this hacks it:
        height: 0,
        paddingTop: '100%',
      },
    }),
  }), 'Card.Image'),
  withProps({ maintainAspectRatio: true }),
)(ConnectedImage);

export default Image;
