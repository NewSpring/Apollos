import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation isSavingPaymentMethod($isSavingPaymentMethod: Boolean!) {
    isSavingPaymentMethod(isSavingPaymentMethod: $isSavingPaymentMethod) @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    isSavingPaymentMethod: isSavingPaymentMethod => (mutate({
      variables: {
        isSavingPaymentMethod,
      },
    })),
  }),
});
