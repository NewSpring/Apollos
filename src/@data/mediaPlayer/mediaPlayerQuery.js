import gql from 'graphql-tag';

export default gql`
  query MediaPlayer {
    mediaPlayer @client {
      id
      isPlaying
      playlist
      isShuffling
      isRepeating
      currentTrack {
        duration
        file
        title
      }
    }
  }
`;
