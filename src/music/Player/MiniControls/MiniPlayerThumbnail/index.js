import React from 'react';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';

import styled from '@ui/styled';
import ConnectedImage from '@ui/ConnectedImage';

const enhance = compose(
  pure,
  setPropTypes({
    source: ConnectedImage.propTypes.source,
    isPlaying: PropTypes.bool,
  }),
);

const Image = styled({
  aspectRatio: 1,
})(ConnectedImage);

const MiniPlayerThumbnail = enhance(({ source }) => <Image source={source} />);

export default MiniPlayerThumbnail;
