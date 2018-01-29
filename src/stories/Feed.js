import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import BackgroundView from '@ui/BackgroundView';
import withStories from '@data/withStories';

const StoriesFeed = withStories(FeedView);

const enhance = compose(
  pure,
);

const Stories = enhance(() => (
  <BackgroundView>
    <Header backButton titleText="All Stories" />
    <StoriesFeed />
  </BackgroundView>
));

export default Stories;
