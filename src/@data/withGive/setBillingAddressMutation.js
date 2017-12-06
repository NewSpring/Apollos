import gql from 'graphql-tag';

export default gql`
  mutation setBillingAddress($street1: String!, $street2: String, $countryId: String!, $city: String!, $stateId: String!, $zipCode: String!) {
    setBillingAddress(street1: $street1, street2: $street2, countryId: $countryId, city: $city, stateId: $stateId, zipCode: $zipCode) @client
  }
`;
