import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import FlexedRootView from '@ui/FlexedRootView';
import withNewsStories from '@data/withNewsStories';

const NewsFeed = withNewsStories(FeedView);

const enhance = compose(
  pure,
);

const News = enhance(() => (
  <FlexedRootView>
    <Header backButton titleText="All News" />
    <NewsFeed />
  </FlexedRootView>
));

export default News;
