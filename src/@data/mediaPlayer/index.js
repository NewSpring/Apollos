import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';
import playMutation from './playMutation';
import pauseMutation from './pauseMutation';
import mediaPlayerQuery from './mediaPlayerQuery';
import albumQuery from './albumQuery';
import albumsQuery from './albumsQuery';

const play = graphql(playMutation, {
  props: ({ mutate }) => ({
    play: ({ id } = {}) => (mutate({
      variables: {
        id,
      },
    })),
  }),
});

const pause = graphql(pauseMutation, {
  props: ({ mutate }) => ({
    pause: () => (mutate()),
  }),
});

const get = graphql(mediaPlayerQuery, {
  props: ({ data: { mediaPlayer } }) => ({
    mediaPlayer,
  }),
});

export const withLibrary = graphql(albumsQuery, {
  options: { variables: { limit: 20, skip: 0 } },
  props: ({ data }) => ({
    library: data.library,
    libraryIsLoading: data.loading,
    refetchLibrary: data.refetch,
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
    playlist,
  }),
});

export const withMediaPlayerActions = compose(
  play,
  pause,
  get,
);
