import gql from 'graphql-tag';

export default gql`
  mutation isPaying($isPaying: Boolean!) {
    isPaying(isPaying: $isPaying) @client
  }
`;
