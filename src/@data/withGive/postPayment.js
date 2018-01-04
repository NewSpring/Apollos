import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation postPayment {
    postPayment @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    postPayment: () => (mutate()),
  }),
});
