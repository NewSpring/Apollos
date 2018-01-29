import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import VideoPlayer from '@ui/VideoPlayer';
import FlexedView from '@ui/FlexedView';
import styled from '@ui/styled';

import withLiveNow from '@data/withLiveNow';

const enhance = compose(
  pure,
  withLiveNow,
  setPropTypes({
    isLive: PropTypes.bool,
    videoUrl: PropTypes.string,
  }),
);

const TheaterMode = styled(
  StyleSheet.absoluteFill,
)(VideoPlayer);

const SeriesTrailer = enhance(({
  videoUrl,
}) => (
  <FlexedView>
    <TheaterMode src={videoUrl} />
  </FlexedView>
));

export default SeriesTrailer;
