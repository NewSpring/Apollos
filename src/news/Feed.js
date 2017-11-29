import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@modules/Header';
import FeedView from '@primitives/FeedView';
import FlexedView from '@primitives/FlexedView';
import withNewsStories from '@data/withNewsStories';

const NewsFeed = withNewsStories(FeedView);

const enhance = compose(
  pure,
);

const News = enhance(() => (
  <FlexedView>
    <Header backButton titleText="All News" />
    <NewsFeed />
  </FlexedView>
));

export default News;
