import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import ContentView from '@ui/ContentView';
import MediaQuery from '@ui/MediaQuery';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import { withPlaylist } from '@data/mediaPlayer';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withPlaylist,
);

const Playlist = enhance(({
  content: {
    content = {},
  } = { },
}) => (
  <FlexedView>
    <Header titleText="Music" backButton />
    <ScrollView>
      <ContentView {...content} />
    </ScrollView>
    <MediaQuery maxWidth="md">
      <SecondaryNav>
        <Link icon="share" />
        <Link icon="like" />
      </SecondaryNav>
    </MediaQuery>
  </FlexedView>
));
export default Playlist;
