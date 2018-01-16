import { StyleSheet } from 'react-native';
import { compose } from 'recompose';

import styled from '@ui/styled';
import ConnectedImage from '@ui/ConnectedImage';
import { getIsLoading } from '@ui/isLoading';

const Image = compose(
  getIsLoading,
  styled({
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  }, 'Card.Image'),
)(ConnectedImage);

export default Image;
