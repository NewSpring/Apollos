import gql from 'graphql-tag';

export default gql`
  mutation nowPlaying($id: ID, $playlist: PlaylistInput, $currentTrack: FileInput) {
    nowPlaying(id: $id, playlist: $playlist, currentTrack: $currentTrack) @client
  }
`;
