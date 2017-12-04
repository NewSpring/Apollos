import gql from 'graphql-tag';

export default gql`
  mutation setContributionStartDate($startDate: String!) {
    setContributionStartDate(startDate: $startDate) @client
  }
`;
