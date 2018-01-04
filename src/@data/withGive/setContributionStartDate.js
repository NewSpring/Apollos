import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation setContributionStartDate($startDate: String!) {
    setContributionStartDate(startDate: $startDate) @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    setContributionStartDate: startDate => (mutate({
      variables: {
        startDate: startDate.toJSON(),
      },
    })),
  }),
});
