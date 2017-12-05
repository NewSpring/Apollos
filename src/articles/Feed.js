import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import FlexedView from '@ui/FlexedView';
import withArticles from '@data/withArticles';

const ArticlesFeed = withArticles(FeedView);

const enhance = compose(
  pure,
);

const Articles = enhance(() => (
  <FlexedView>
    <Header backButton titleText="All Articles" />
    <ArticlesFeed />
  </FlexedView>
));

export default Articles;
