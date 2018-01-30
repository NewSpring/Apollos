import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import TileNav from '@ui/TileNav';
import withSections from '@data/withSections';
import BackgroundView from '@ui/BackgroundView';

const TileNavWithSections = withSections(TileNav);

const enhance = compose(
  pure,
);

const Sections = enhance(() => (
  <BackgroundView>
    <Header titleText="Sections" />
    <TileNavWithSections />
  </BackgroundView>
));

export default Sections;
