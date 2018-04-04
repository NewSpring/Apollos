import gql from 'graphql-tag';

export default gql`
  mutation stop {
    stop @client
  }
`;
