import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@modules/Header';
import FeedView from '@primitives/FeedView';
import FlexedView from '@primitives/FlexedView';
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
