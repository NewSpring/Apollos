export function mediaPlayer() {
  return {
    __typename: 'MediaPlayer',
    isPlaying: false,
    playlist: null,
    currentTrack: null,
    isShuffling: false,
    isRepeating: false,
  };
}

