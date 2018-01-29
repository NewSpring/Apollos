import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import FlexedRootView from '@ui/FlexedRootView';
import withSeries from '@data/withSeries';

const SeriesFeed = withSeries(FeedView);

const enhance = compose(
  pure,
);

const Series = enhance(() => (
  <FlexedRootView>
    <Header backButton titleText="All Series" />
    <SeriesFeed />
  </FlexedRootView>
));

export default Series;
