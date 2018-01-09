import gql from 'graphql-tag';

export default gql`
  query MediaPlayer {
    mediaPlayer @client {
      isPlaying
      albumId
      currentTrack {
        duration
        file
        title
      }
    }
  }
`;
