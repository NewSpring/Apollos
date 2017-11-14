import gql from 'graphql-tag';

export default gql`
  query GetFilterContent {
    family: currentFamily {
      person { nickName, firstName, lastName, id: entityId }
    }
  }
`;
