export function mediaPlayer() {
  return {
    __typename: 'MediaPlayer',
    isPlaying: false,
    albumId: null,
    currentTrack: null,
    shuffle: null,
    repeat: false,
  };
}

