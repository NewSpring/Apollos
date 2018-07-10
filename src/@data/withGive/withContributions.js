import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const QUERY = gql`
  query Give {
    contributions @client {
      id
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
      creditCard {
        id
        cardNumber
        expirationDate
        cvv
      }
      bankAccount {
        id
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
      isSavingPaymentMethod
      willSavePaymentMethod
      savedAccountName
      savedPaymentMethodId
    }
  }
`;

export default graphql(QUERY, {
  props({ ownProps, data: { error, contributions, loading } }) {
    if (!contributions) return { contributions, isLoading: ownProps.isLoading || loading };
    return {
      error: error || ownProps.error,
      isLoading: ownProps.isLoading || loading,
      contributions: {
        ...contributions,
        startDate: contributions && new Date(contributions.startDate),
      },
    };
  },
});
