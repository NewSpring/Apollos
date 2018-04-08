import { StyleSheet } from 'react-native';
import { compose } from 'recompose';

import styled from '@ui/styled';
import ProgressiveImage from '@ui/ProgressiveImage';
import { getIsLoading } from '@ui/isLoading';

const Image = compose(
  getIsLoading,
  styled({
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  }, 'Card.Image'),
)(ProgressiveImage);

Image.propTypes = ProgressiveImage.propTypes;

export default Image;
