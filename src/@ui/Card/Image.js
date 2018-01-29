import { Platform } from 'react-native';
import { compose } from 'recompose';

import styled from '@ui/styled';
import ConnectedImage from '@ui/ConnectedImage';
import { getIsLoading } from '@ui/isLoading';

const Image = compose(
  getIsLoading,
  styled(({ theme }) => ({
    aspectRatio: 1,
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
)(ConnectedImage);

Image.propTypes = ConnectedImage.propTypes;

export default Image;
