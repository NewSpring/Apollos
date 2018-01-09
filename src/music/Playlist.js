import React from 'react';
import { filter } from 'lodash';
import { compose, mapProps, withProps, pure } from 'recompose';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import TracksList from '@ui/TracksList';
import AlbumView from '@ui/AlbumView';
import MediaQuery from '@ui/MediaQuery';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import { withPlaylist, withMediaPlayerActions, withNowPlaying } from '@data/mediaPlayer';

const enhance = compose(
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withPlaylist,
  withMediaPlayerActions,
  withNowPlaying,
  pure,
  withProps(({ setNowPlaying, id }) => ({
    setNowPlaying: track => setNowPlaying({ albumId: id, currentTrack: track }),
  })),
);

// TODO: we should modify Heighliner to separate these resources into props
const getAlbumImageSource = images => filter(images, image => (
  image.fileName.indexOf('blur') === -1
));

const getBlurredImageSource = images => filter(images, image => (
  image.fileName.indexOf('blur') > -1
));

const Playlist = enhance(({
  content: {
    title,
    content: {
      images = [],
      tracks = [],
    } = {},
  } = { },
  isLoading,
  setNowPlaying,
}) => (
  <FlexedView>
    <Header titleText="Music" backButton />
    <TracksList
      isLoading={isLoading}
      tracks={tracks}
      onTrackPress={setNowPlaying}
      ListHeaderComponent={
        <AlbumView
          isLoading={isLoading}
          title={title}
          artist="NewSpring"
          albumImage={getAlbumImageSource(images)}
          blurredImage={getBlurredImageSource(images)}
        />
      }
    />
    <MediaQuery maxWidth="md">
      <SecondaryNav>
        <Link icon="share" />
        <Link icon="like" />
      </SecondaryNav>
    </MediaQuery>
  </FlexedView>
));
export default Playlist;
