import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import BackgroundView from '@ui/BackgroundView';
import withArticles from '@data/withArticles';

const ArticlesFeed = withArticles(FeedView);

const enhance = compose(
  pure,
);

const Articles = enhance(() => (
  <BackgroundView>
    <Header backButton titleText="All Articles" />
    <ArticlesFeed />
  </BackgroundView>
));

export default Articles;
