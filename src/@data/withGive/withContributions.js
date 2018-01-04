import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const QUERY = gql`
  query Give {
    contributions @client {
      contributions
      frequencyId
      startDate
      firstName
      lastName
      email
      campusId
      street1
      street2
      countryId
      city
      stateId
      zipCode
      isLoadingOrderUrl
      orderPaymentUrl
      orderPaymentToken
      creditCard {
        cardNumber
        expirationDate
        cvv
      }
      bankAccount {
        accountNumber
        routingNumber
        accountName
        accountType
      }
      paymentMethod
      isPaying
      paymentFailed
      paymentFailedMessage
      paymentSuccessful
    }
  }
`;

export default graphql(QUERY, {
  props({ data: { contributions, loading } }) {
    if (!contributions) return { contributions, isLoading: loading };
    return {
      isLoading: loading,
      contributions: {
        ...contributions,
        startDate: contributions && new Date(contributions.startDate),
      },
    };
  },
});
