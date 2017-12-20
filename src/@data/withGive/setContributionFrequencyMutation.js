import gql from 'graphql-tag';

export default gql`
  mutation setContributionFrequency($id: String!) {
    setContributionFrequency(id: $id) @client
  }
`;
