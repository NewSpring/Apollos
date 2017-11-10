export function mediaPlayer() {
  return {
    __typename: 'MediaPlayer',
    isPlaying: false,
    current: null,
    playlist: [],
  };
}

