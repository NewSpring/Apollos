import React from 'react';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';

import GradientOverlayImage from '@ui/GradientOverlayImage';
import ProgressiveImage from '@ui/ProgressiveImage';
import { getItemImages } from '@utils/content';

const enhance = compose(
  pure,
  setPropTypes({
    images: PropTypes.any, // eslint-disable-line
    thumbnail:  PropTypes.any, // eslint-disable-line
    imageOverlayColor: PropTypes.string,
  }),
);

const ImageHeader = enhance(({ images, thumbnail, imageOverlayColor }) => (
  <GradientOverlayImage
    ImageComponent={ProgressiveImage}
    // todo: calling getItemImages like this is kinda dirty
    source={getItemImages({ content: { images } })}
    thumbnail={thumbnail}
    overlayColor={imageOverlayColor}
  />
));

export default ImageHeader;
