import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import FlexedView from '@ui/FlexedView';
import withStories from '@data/withStories';

const StoriesFeed = withStories(FeedView);

const enhance = compose(
  pure,
);

const Stories = enhance(() => (
  <FlexedView>
    <Header backButton titleText="All Stories" />
    <StoriesFeed />
  </FlexedView>
));

export default Stories;
