import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import BackgroundView from '@ui/BackgroundView';
import withSeries from '@data/withSeries';

const SeriesFeed = withSeries(FeedView);

const enhance = compose(
  pure,
);

const Series = enhance(() => (
  <BackgroundView>
    <Header backButton titleText="All Series" />
    <SeriesFeed />
  </BackgroundView>
));

export default Series;
