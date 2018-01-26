import gql from 'graphql-tag';

export default gql`
  mutation play {
    play @client
  }
`;
