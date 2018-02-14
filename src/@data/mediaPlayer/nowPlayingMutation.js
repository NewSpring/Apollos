import gql from 'graphql-tag';

export default gql`
  mutation nowPlaying($playlist: PlaylistInput, $currentTrack: FileInput) {
    nowPlaying(playlist: $playlist, currentTrack: $currentTrack) @client
  }
`;
