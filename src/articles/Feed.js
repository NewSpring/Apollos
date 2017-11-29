import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@modules/Header';
import FeedView from '@primitives/FeedView';
import FlexedView from '@primitives/FlexedView';
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
