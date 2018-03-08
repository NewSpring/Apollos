import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import EmbeddedVideoPlayer from '@ui/EmbeddedVideoPlayer';
import FlexedView from '@ui/FlexedView';
import styled from '@ui/styled';

import withLiveNow from '@data/withLiveNow';

const enhance = compose(
  pure,
  withLiveNow,
  setPropTypes({
    isLive: PropTypes.bool,
    isFuse: PropTypes.bool,
    embedUrl: PropTypes.string,
  }),
);

const TheaterMode = styled(StyleSheet.absoluteFill)(EmbeddedVideoPlayer);

const SeriesTrailer = enhance(({ embedUrl }) => (
  <FlexedView>
    <TheaterMode src={embedUrl} />
  </FlexedView>
));

export default SeriesTrailer;
