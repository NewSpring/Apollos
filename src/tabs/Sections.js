import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import TileNav from '@ui/TileNav';
import withSections from '@data/withSections';
import FlexedView from '@ui/FlexedView';

const TileNavWithSections = withSections(TileNav);

const enhance = compose(
  pure,
);

const Sections = enhance(() => (
  <FlexedView>
    <Header titleText="Sections" />
    <TileNavWithSections />
  </FlexedView>
));

export default Sections;
