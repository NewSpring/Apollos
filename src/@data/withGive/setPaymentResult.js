import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation setPaymentResult($error: String, $success: Boolean) {
    setPaymentResult(error: $error, success: $success) @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    setPaymentResult: (props) => {
      mutate({
        variables: {
          error: props.error,
          success: props.success,
        },
        refetchQueries: ['GivingDashboard', 'GetCheckoutData', 'SavedPaymentMethods', 'GetTransactions'],
      });
    },
  }),
});
