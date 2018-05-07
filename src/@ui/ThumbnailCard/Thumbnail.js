import { StyleSheet } from 'react-native';
import { compose } from 'recompose';

import styled from '@ui/styled';
import ProgressiveImage from '@ui/ProgressiveImage';
import { getIsLoading } from '@ui/isLoading';

const Image = compose(
  getIsLoading,
  styled({
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }, 'Card.Image'),
)(ProgressiveImage);

Image.propTypes = ProgressiveImage.propTypes;

export default Image;
