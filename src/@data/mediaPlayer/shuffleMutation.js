import gql from 'graphql-tag';

export default gql`
  mutation shuffle($isShuffling: Boolean) {
    shuffle($isShuffling) @client
  }
`;
