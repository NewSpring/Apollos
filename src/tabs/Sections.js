import React from 'react';
import Header from '@modules/Header';
import TileNav from '@modules/TileNav';
import withSections from '@data/withSections';
import FlexedView from '@primitives/FlexedView';

const TileNavWithSections = withSections(TileNav);

export default function Sections() {
  return (
    <FlexedView>
      <Header titleText="Sections" />
      <TileNavWithSections />
    </FlexedView>
  );
}
