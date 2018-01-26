export function mediaPlayer() {
  return {
    __typename: 'MediaPlayer',
    isPlaying: false,
    albumId: null,
    currentTrack: null,
    isShuffling: false,
    isRepeating: false,
  };
}

