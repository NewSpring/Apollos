import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import FlexedView from '@ui/FlexedView';
import withStudies from '@data/withStudies';

const StudiesFeed = withStudies(FeedView);

const enhance = compose(
  pure,
);

const Studies = enhance(() => (
  <FlexedView>
    <Header backButton titleText="All Studies" />
    <StudiesFeed />
  </FlexedView>
));

export default Studies;
