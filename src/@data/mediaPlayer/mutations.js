import { track, events } from '@utils/analytics';
import mediaPlayerQuery from './mediaPlayerQuery';

export function play(result, variables, { cache }) {
  const { mediaPlayer: state } = cache.readQuery({
    query: mediaPlayerQuery,
    variables,
  });

  if (!state.currentTrack) return null;

  track(events.AudioPlayed, state);

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

  const mediaPlayer = {
    ...state,
    isPlaying: true,
    id: variables.id,
    playlist: variables.playlist || state.playlist,
    currentTrack: variables.currentTrack || variables.currentTrack,
  };

  track(events.AudioPlayed, mediaPlayer);

  cache.writeQuery({
    query: mediaPlayerQuery,
    variables,
    data: {
      mediaPlayer,
    },
  });
  return null;
}

export function shuffle(result, variables, { cache }) {
  const { mediaPlayer: state } = cache.readQuery({
    query: mediaPlayerQuery,
    variables,
  });

  let { isShuffling } = variables;

  if (typeof isShuffling === 'undefined') {
    isShuffling = !state.isShuffling;
  }

  cache.writeQuery({
    query: mediaPlayerQuery,
    variables,
    data: {
      mediaPlayer: {
        ...state,
        isShuffling: isShuffling ? Date.now() : null,
      },
    },
  });
  return null;
}

export function repeat(result, variables, { cache }) {
  const { mediaPlayer: state } = cache.readQuery({
    query: mediaPlayerQuery,
    variables,
  });

  let { isRepeating } = variables;

  if (typeof isRepeating === 'undefined') {
    isRepeating = !state.isRepeating;
  }

  cache.writeQuery({
    query: mediaPlayerQuery,
    variables,
    data: {
      mediaPlayer: {
        ...state,
        isRepeating,
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

  track(events.AudioPaused, state);

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

export function stop(result, variables, { cache }) {
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
        id: null,
        currentTrack: null,
      },
    },
  });
  return null;
}

