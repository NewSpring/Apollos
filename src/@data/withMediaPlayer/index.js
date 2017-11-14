import { graphql } from 'react-apollo';
import { compose } from 'recompose';
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

const libraryQuery = graphql(albumsQuery, {
  props: ({ data: { content } }) => ({
    library: content,
  }),
});

const playlistQuery = graphql(albumQuery, {
  props: ({ data: { content } }) => ({
    playlist: content,
  }),
});


export default compose(
  play,
  pause,
  get,
  libraryQuery,
  playlistQuery,
);
