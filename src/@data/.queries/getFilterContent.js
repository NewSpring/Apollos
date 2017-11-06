import { gql } from 'react-apollo';

export default gql`
  query GetFilterContent {
    family: currentFamily {
      person { nickName, firstName, lastName, id: entityId }
    }
  }
`;
