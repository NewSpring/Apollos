import gql from 'graphql-tag';

export default gql`
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
      isPostingPayment
    }
  }
`;
