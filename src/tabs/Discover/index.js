import React from 'react';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import Feed from './Feed';

const Discover = () => (
  <FlexedView>
    <Header titleText="Discover" />
    <Feed />
  </FlexedView>
);

export default Discover;
