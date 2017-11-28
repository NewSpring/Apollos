import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@modules/Header';
import TileNav from '@modules/TileNav';
import withSections from '@data/withSections';
import FlexedView from '@primitives/FlexedView';

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
