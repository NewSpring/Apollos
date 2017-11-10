import mediaPlayerQuery from './mediaPlayerQuery';

export function play(result, variables, { cache }) {
  const { mediaPlayer: state } = cache.readQuery({
    query: mediaPlayerQuery,
    variables,
  });

  cache.writeQuery({
    query: mediaPlayerQuery,
    variables,
    data: {
      mediaPlayer: {
        ...state,
        isPlaying: true,
        current: variables.id,
      },
    },
  });
  return null;
}

export function pause(result, variables, { cache }) {
  const { mediaPlayer: state } = cache.readQuery({
    query: mediaPlayerQuery,
    variables,
  });

  cache.writeQuery({
    query: mediaPlayerQuery,
    variables,
    data: {
      mediaPlayer: {
        ...state,
        isPlaying: false,
      },
    },
  });
  return null;
}
