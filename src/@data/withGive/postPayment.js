import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation postPayment($url: String!) {
    postPayment(url: $url) @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    postPayment: url => (mutate({
      variables: {
        url,
      },
    })),
  }),
});
