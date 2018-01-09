import mediaPlayerQuery from './mediaPlayerQuery';

export function play(result, variables, { cache }) {
  const { mediaPlayer: state } = cache.readQuery({
    query: mediaPlayerQuery,
    variables,
  });

  if (!state.currentTrackId) return null;

  cache.writeQuery({
    query: mediaPlayerQuery,
    variables,
    data: {
      mediaPlayer: {
        ...state,
        isPlaying: true,
      },
    },
  });
  return null;
}

export function nowPlaying(result, variables, { cache }) {
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
        albumId: variables.albumId,
        currentTrack: variables.currentTrack,
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
