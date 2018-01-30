import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import TileNav from '@ui/TileNav';
import withSections from '@data/withSections';
import LiveNowButton from '@ui/LiveNowButton';
import BackgroundView from '@ui/BackgroundView';

const TileNavWithSections = withSections(TileNav);

const enhance = compose(
  pure,
);

const Sections = enhance(() => (
  <BackgroundView>
    <Header titleText="Sections" />
    <LiveNowButton />
    <TileNavWithSections />
  </BackgroundView>
));

export default Sections;
