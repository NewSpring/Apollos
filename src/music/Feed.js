import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import FlexedRootView from '@ui/FlexedRootView';
import { withLibrary } from '@data/mediaPlayer';

const MusicFeed = withLibrary(FeedView);

const enhance = compose(
  pure,
);

const Music = enhance(() => (
  <FlexedRootView>
    <Header backButton titleText="All Music" />
    <MusicFeed />
  </FlexedRootView>
));

export default Music;
