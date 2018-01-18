import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation willSavePaymentMethod($willSavePaymentMethod: Boolean!) {
    willSavePaymentMethod(willSavePaymentMethod: $willSavePaymentMethod) @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    willSavePaymentMethod: willSavePaymentMethod => (mutate({
      variables: {
        willSavePaymentMethod,
      },
    })),
  }),
});
