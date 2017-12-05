import gql from 'graphql-tag';

export default gql`
  query GetCheckoutData($state: Int!, $country: Int!) {
    states: definedValues(id: $state, all: true) {
      name: description, value, id, _id
    }
    countries: definedValues(id: $country, all: true) {
      name: description, value, id, _id
    }
    person: currentPerson {
      firstName
      nickName
      lastName
      email
      campus { name, id: entityId }
      home { street1, street2, city, state, zip, country }
    }
    savedPayments {
      name, id: entityId, date,
      payment { accountNumber, paymentType }
    }
    campuses { name, id: entityId }
  }
`;
