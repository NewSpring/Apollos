import gql from 'graphql-tag';

export default gql`
  mutation nowPlaying($albumId: String, $currentTrack: FileInput) {
    nowPlaying(albumId: $albumId, currentTrack: $currentTrack) @client
  }
`;
