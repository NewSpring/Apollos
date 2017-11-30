import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@modules/Header';
import FeedView from '@primitives/FeedView';
import FlexedView from '@primitives/FlexedView';
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
