import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import FlexedView from '@ui/FlexedView';
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
