import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import FlexedRootView from '@ui/FlexedRootView';
import withStories from '@data/withStories';

const StoriesFeed = withStories(FeedView);

const enhance = compose(
  pure,
);

const Stories = enhance(() => (
  <FlexedRootView>
    <Header backButton titleText="All Stories" />
    <StoriesFeed />
  </FlexedRootView>
));

export default Stories;
