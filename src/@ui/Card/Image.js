import { Platform } from 'react-native';
import { compose } from 'recompose';

import styled from '@ui/styled';
import ProgressiveImage from '@ui/ProgressiveImage';
import { getIsLoading } from '@ui/isLoading';

const Image = compose(
  getIsLoading,
  styled(({ theme }) => ({
    aspectRatio: 1,
    width: '100%',
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
)(ProgressiveImage);

Image.propTypes = ProgressiveImage.propTypes;

export default Image;
