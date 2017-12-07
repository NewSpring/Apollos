import gql from 'graphql-tag';

export default gql`
  query MediaPlayer {
    mediaPlayer @client {
      isPlaying
      current
    }
  }
`;
