import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, mapProps } from 'recompose';
import RotatingVideoPlayer from '@ui/RotatingVideoPlayer';
import BackgroundView from '@ui/BackgroundView';
import styled from '@ui/styled';

import withSeriesContent from '@data/withSeriesContent';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withSeriesContent,
  setPropTypes({
    video: PropTypes.shape({
      videoUrl: PropTypes.string,
    }),
  }),
);

const VideoBackgroundView = styled(({ theme }) => ({
  backgroundColor: theme.colors.black,
}))(BackgroundView);

const SeriesTrailer = enhance(({
  content: {
    content: {
      video,
    } = {},
  } = {},
}) => (
  <VideoBackgroundView>
    <RotatingVideoPlayer src={video.videoUrl} shouldPlay />
  </VideoBackgroundView>
));

export default SeriesTrailer;
