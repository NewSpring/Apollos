import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';
import identifyCategory from '@data/utils/identifyCategory';
import playMutation from './playMutation';
import pauseMutation from './pauseMutation';
import shuffleMutation from './shuffleMutation';
import repeatMutation from './repeatMutation';
import nowPlayingMutation from './nowPlayingMutation';
import mediaPlayerQuery from './mediaPlayerQuery';
import albumQuery from './albumQuery';
import albumsQuery from './albumsQuery';

const play = graphql(playMutation, {
  props: ({ mutate }) => ({
    play: () => (mutate()),
  }),
});

const setNowPlaying = graphql(nowPlayingMutation, {
  props: ({ mutate }) => ({
    setNowPlaying: ({
      id,
      playlist,
      currentTrack,
    }) => mutate({
      variables: { id, playlist, currentTrack },
    }),
  }),
});

const shuffle = graphql(shuffleMutation, {
  props: ({ mutate }) => ({
    shuffle: ({ isShuffling }) => mutate({
      variables: { isShuffling },
    }),
  }),
});

const repeat = graphql(repeatMutation, {
  props: ({ mutate }) => ({
    repeat: ({ isRepeating }) => mutate({
      variables: { isRepeating },
    }),
  }),
});

const pause = graphql(pauseMutation, {
  props: ({ mutate }) => ({
    pause: () => (mutate()),
  }),
});

export const withNowPlaying = graphql(mediaPlayerQuery, {
  props: ({ data: { mediaPlayer } }) => ({
    nowPlaying: mediaPlayer,
  }),
});

export const withLibrary = graphql(albumsQuery, {
  options: { variables: { limit: 20, skip: 0 } },
  props: ({ data, ownProps }) => ({
    content: data.library && data.library.map(identifyCategory),
    isLoading: ownProps.isLoading || data.loading,
    refetch: data.refetch,
    fetchMore: fetchMoreResolver({
      collectionName: 'library',
      data,
    }),
  }),
});

export const withPlaylist = graphql(albumQuery, {
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
  props: ({ data: { playlist } }) => ({
    content: playlist,
  }),
  skip: ({ id }) => !id,
});

export const withMediaPlayerActions = compose(
  play,
  pause,
  shuffle,
  repeat,
  setNowPlaying,
);
