import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import FlexedRootView from '@ui/FlexedRootView';
import withHomeFeed from '@data/withHomeFeed';

const FeedViewWithHomeFeed = withHomeFeed(FeedView);

const enhance = compose(
  pure,
);

const Feed = enhance(() => (
  <FlexedRootView>
    <Header titleText="NewSpring Church" />
    <FeedViewWithHomeFeed />
  </FlexedRootView>
));

export default Feed;
