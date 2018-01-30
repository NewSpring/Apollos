import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import BackgroundView from '@ui/BackgroundView';
import withNewsStories from '@data/withNewsStories';

const NewsFeed = withNewsStories(FeedView);

const enhance = compose(
  pure,
);

const News = enhance(() => (
  <BackgroundView>
    <Header backButton titleText="All News" />
    <NewsFeed />
  </BackgroundView>
));

export default News;
