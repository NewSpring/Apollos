import React from 'react';
import {
  View,
} from 'react-native';
import { pure, compose } from 'recompose';
import Header from '@modules/Header';
import FeedView from '@primitives/FeedView';
import withHomeFeed from '@data/withHomeFeed';

const FeedViewWithHomeFeed = withHomeFeed(FeedView);

const enhance = compose(
  pure,
);

const Feed = enhance(() => (
  <View style={{ flex: 1 }}>
    <Header titleText="NewSpring Church" />
    <FeedViewWithHomeFeed />
  </View>
));

export default Feed;
