import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import BackgroundView from '@ui/BackgroundView';
import { withLibrary } from '@data/mediaPlayer';

const MusicFeed = withLibrary(FeedView);

const enhance = compose(
  pure,
);

const Music = enhance(() => (
  <BackgroundView>
    <Header backButton titleText="All Music" />
    <MusicFeed />
  </BackgroundView>
));

export default Music;
