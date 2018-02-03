import { StyleSheet } from 'react-native';
import { compose } from 'recompose';

import styled from '@ui/styled';
import ConnectedImage from '@ui/ConnectedImage';
import { getIsLoading } from '@ui/isLoading';

const Image = compose(
  getIsLoading,
  styled({
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  }, 'Card.Image'),
)(ConnectedImage);

Image.propTypes = ConnectedImage.propTypes;

export default Image;
