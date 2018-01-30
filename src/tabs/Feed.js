import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import BackgroundView from '@ui/BackgroundView';
import withHomeFeed from '@data/withHomeFeed';
import LiveNowButton from '@ui/LiveNowButton';

const FeedViewWithHomeFeed = withHomeFeed(FeedView);

const enhance = compose(
  pure,
);

const Feed = enhance(() => (
  <BackgroundView>
    <Header titleText="NewSpring Church" />
    <LiveNowButton />
    <FeedViewWithHomeFeed />
  </BackgroundView>
));

export default Feed;
