import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import BackgroundView from '@ui/BackgroundView';
import withStudies from '@data/withStudies';

const StudiesFeed = withStudies(FeedView);

const enhance = compose(
  pure,
);

const Studies = enhance(() => (
  <BackgroundView>
    <Header backButton titleText="All Studies" />
    <StudiesFeed />
  </BackgroundView>
));

export default Studies;
