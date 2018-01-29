import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import FlexedRootView from '@ui/FlexedRootView';
import withStudies from '@data/withStudies';

const StudiesFeed = withStudies(FeedView);

const enhance = compose(
  pure,
);

const Studies = enhance(() => (
  <FlexedRootView>
    <Header backButton titleText="All Studies" />
    <StudiesFeed />
  </FlexedRootView>
));

export default Studies;
