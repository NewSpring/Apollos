import React from 'react';
import { compose, mapProps, withProps, pure } from 'recompose';
import BackgroundView from '@ui/BackgroundView';
import Header from '@ui/Header';
import TracksList from '@ui/TracksList';
import AlbumView from '@ui/AlbumView';
import MediaQuery from '@ui/MediaQuery';
import SecondaryNav, { Like, Share } from '@ui/SecondaryNav';
import { withPlaylist, withMediaPlayerActions, withNowPlaying } from '@data/mediaPlayer';
import { getBlurredImageSource, getAlbumImageSource } from '@utils/content';

const enhance = compose(
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withPlaylist,
  withMediaPlayerActions,
  withNowPlaying,
  pure,
  withProps(({ setNowPlaying, content, id }) => ({
    setNowPlaying: track => setNowPlaying({
      id,
      playlist: { ...content.content, title: content.title },
      currentTrack: track,
    }),
  })),
);

const ShareLink = withPlaylist(Share);

const Playlist = enhance(({
  id,
  content: {
    title,
    content: {
      isLiked,
      images = [],
      tracks = [],
    } = {},
  } = { },
  isLoading,
  setNowPlaying,
}) => (
  <BackgroundView>
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
        <ShareLink id={id} />
        <Like id={id} isLiked={isLiked} />
      </SecondaryNav>
    </MediaQuery>
  </BackgroundView>
));
export default Playlist;
