import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@modules/Header';
import FeedView from '@primitives/FeedView';
import FlexedView from '@primitives/FlexedView';
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
