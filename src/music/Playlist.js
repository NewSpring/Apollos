import React from 'react';
import { compose, mapProps, withProps, pure } from 'recompose';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import TracksList from '@ui/TracksList';
import AlbumView from '@ui/AlbumView';
import MediaQuery from '@ui/MediaQuery';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import { withPlaylist, withMediaPlayerActions, withNowPlaying } from '@data/mediaPlayer';
import { getBlurredImageSource, getAlbumImageSource } from '@utils/content';

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

const Playlist = enhance(({
  id,
  content: {
    title,
    content: {
      images = [],
      tracks = [],
    } = {},
  } = { },
  isLoading,
  setNowPlaying,
}) => console.log({ tracks, isLoading }) || (
  <FlexedView>
    <Header titleText="Music" backButton />
    <TracksList
      isLoading={isLoading}
      tracks={tracks}
      onTrackPress={setNowPlaying}
      trackEllipsisLink={({ title: track }) => `/music/${id}/${encodeURIComponent(track)}`}
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
