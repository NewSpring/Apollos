import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import playMutation from './playMutation';
import pauseMutation from './pauseMutation';
import mediaPlayerQuery from './mediaPlayerQuery';

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

export default compose(
  play,
  pause,
  get,
);
