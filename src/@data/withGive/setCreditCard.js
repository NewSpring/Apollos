import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation setCreditCard($cardNumber: String!, $expirationDate: String!, $cvv: String) {
    setCreditCard(cardNumber: $cardNumber, expirationDate: $expirationDate, cvv: $cvv) @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    setCreditCard: props => (mutate({
      variables: {
        cardNumber: props.cardNumber,
        expirationDate: props.expirationDate,
        cvv: props.cvv,
      },
    })),
  }),
});
