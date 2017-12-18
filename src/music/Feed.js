import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import FlexedView from '@ui/FlexedView';
import { withLibrary } from '@data/mediaPlayer';

const MusicFeed = withLibrary(FeedView);

const enhance = compose(
  pure,
);

const Music = enhance(() => (
  <FlexedView>
    <Header backButton titleText="All Music" />
    <MusicFeed />
  </FlexedView>
));

export default Music;
