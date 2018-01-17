import gql from 'graphql-tag';

export default gql`
  mutation repeat($isRepeating: Boolean) {
    repeat(isRepeating: $isRepeating) @client
  }
`;
