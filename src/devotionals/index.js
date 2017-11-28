import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@modules/Header';
import FeedView from '@primitives/FeedView';
import FlexedView from '@primitives/FlexedView';
import withDevotionals from '@data/withDevotionals';

const DevotionalsFeed = withDevotionals(FeedView);

const enhance = compose(
  pure,
);

const Devotionals = enhance(() => (
  <FlexedView>
    <Header backButton titleText="All Devotionals" />
    <DevotionalsFeed />
  </FlexedView>
));

export default Devotionals;
