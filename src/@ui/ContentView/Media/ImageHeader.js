import React from 'react';
import { compose, pure, setPropTypes } from 'recompose';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';

import ConnectedImage from '@ui/ConnectedImage';
import GradientOverlayImage from '@ui/GradientOverlayImage';
import styled from '@ui/styled';

const enhance = compose(
  pure,
  setPropTypes({
    images: PropTypes.any, // eslint-disable-line
    imageOverlayColor: PropTypes.string,
  }),
);

const StyledImage = styled({
  width: '100%',
  aspectRatio: 1,
  resizeMode: 'cover',
  ...Platform.select({
    web: {
      height: 0,
      paddingTop: '50%',
    },
  }),
})(ConnectedImage);

const ImageHeader = enhance(({ images, imageOverlayColor }) => (
  <GradientOverlayImage
    imageComponent={StyledImage}
    source={images}
    overlayColor={imageOverlayColor}
  />
));

export default ImageHeader;
