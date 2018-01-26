import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, mapProps } from 'recompose';
import EmbeddedVideoPlayer from '@ui/EmbeddedVideoPlayer';
import FlexedView from '@ui/FlexedView';
import styled from '@ui/styled';

import withSeriesContent from '@data/withSeriesContent';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withSeriesContent,
  setPropTypes({
    video: PropTypes.shape({
      embedUrl: PropTypes.string,
    }),
  }),
);

const TheaterMode = styled(
  StyleSheet.absoluteFill,
)(EmbeddedVideoPlayer);

const SeriesTrailer = enhance(({
  content: {
    content: {
      video,
    } = {},
  } = {},
}) => (
  <FlexedView>
    <TheaterMode src={video.embedUrl} />
  </FlexedView>
));

export default SeriesTrailer;
