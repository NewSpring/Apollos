import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import FlexedView from '@ui/FlexedView';
import withSeries from '@data/withSeries';

const SeriesFeed = withSeries(FeedView);

const enhance = compose(
  pure,
);

const Series = enhance(() => (
  <FlexedView>
    <Header backButton titleText="All Series" />
    <SeriesFeed />
  </FlexedView>
));

export default Series;
