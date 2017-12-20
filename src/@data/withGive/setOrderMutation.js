import gql from 'graphql-tag';

export default gql`
  mutation setOrder($url: String!) {
    setOrder(url: $url) @client
  }
`;
