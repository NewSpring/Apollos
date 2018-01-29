import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import FlexedRootView from '@ui/FlexedRootView';
import withArticles from '@data/withArticles';

const ArticlesFeed = withArticles(FeedView);

const enhance = compose(
  pure,
);

const Articles = enhance(() => (
  <FlexedRootView>
    <Header backButton titleText="All Articles" />
    <ArticlesFeed />
  </FlexedRootView>
));

export default Articles;
