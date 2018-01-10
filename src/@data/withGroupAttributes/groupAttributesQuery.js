import gql from 'graphql-tag';

export default gql`
  query GetGroupAttributes {
    groupAttributes {
      id
      description
      value
    }
  }
`;
