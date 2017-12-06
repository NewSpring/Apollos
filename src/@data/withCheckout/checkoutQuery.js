import gql from 'graphql-tag';

// TODO: The states query is returning both US states
// and Canadian Territories
export default gql`
  query GetCheckoutData($state: Int!, $country: Int!) {
    states: definedValues(id: $state, all: true) {
      description, id, _id, value
    }
    countries: definedValues(id: $country, all: true) {
      description, id, _id, value
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
    campuses { label: name, id: entityId }
  }
`;
