import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import TileNav from '@ui/TileNav';
import withSections from '@data/withSections';
import FlexedRootView from '@ui/FlexedRootView';

const TileNavWithSections = withSections(TileNav);

const enhance = compose(
  pure,
);

const Sections = enhance(() => (
  <FlexedRootView>
    <Header titleText="Sections" />
    <TileNavWithSections />
  </FlexedRootView>
));

export default Sections;
