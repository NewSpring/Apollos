import gql from 'graphql-tag';

export default gql`
  query MediaPlayer {
    mediaPlayer @client {
      isPlaying
      albumId
      shuffle
      repeat
      currentTrack {
        duration
        file
        title
      }
    }
  }
`;
