import gql from 'graphql-tag';

export default gql`
  mutation pause {
    pause @client
  }
`;
