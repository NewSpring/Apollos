export function mediaPlayer() {
  return {
    __typename: 'MediaPlayer',
    id: null,
    isPlaying: false,
    playlist: null,
    currentTrack: null,
    isShuffling: false,
    isRepeating: false,
  };
}

