import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import RotatingVideoPlayer from '@ui/RotatingVideoPlayer';
import BackgroundView from '@ui/BackgroundView';
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

const VideoBackgroundView = styled(({ theme }) => ({
  backgroundColor: theme.colors.black,
}))(BackgroundView);

const SeriesTrailer = enhance(({
  videoUrl,
}) => (
  <VideoBackgroundView>
    <RotatingVideoPlayer src={videoUrl} shouldPlay />
  </VideoBackgroundView>
));

export default SeriesTrailer;
