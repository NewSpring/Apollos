import gql from 'graphql-tag';

export default gql`
  query MediaPlayer {
    mediaPlayer @client {
      isPlaying
      albumId
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
