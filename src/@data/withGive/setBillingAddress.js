import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation setBillingAddress($street1: String!, $street2: String, $countryId: String!, $city: String!, $stateId: String!, $zipCode: String!) {
    setBillingAddress(street1: $street1, street2: $street2, countryId: $countryId, city: $city, stateId: $stateId, zipCode: $zipCode) @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    setBillingAddress: props => (mutate({
      variables: {
        street1: props.street1,
        street2: props.street2,
        countryId: props.countryId,
        city: props.city,
        stateId: props.stateId,
        zipCode: props.zipCode,
      },
    })),
  }),
});

