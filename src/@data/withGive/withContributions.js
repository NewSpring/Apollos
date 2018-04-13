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
      error,
      isLoading: ownProps.isLoading || loading,
      contributions: {
        ...contributions,
        startDate: contributions && new Date(contributions.startDate),
      },
    };
  },
});
