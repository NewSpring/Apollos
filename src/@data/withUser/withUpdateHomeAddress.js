import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import pick from 'lodash/pick';

export const MUTATION = gql`
  mutation updateHomeAddress(
    $street1: String,
    $street2: String,
    $city: String,
    $state: String,
    $postalCode: String
  ) {
    updateHomeAddress(input: {
      Street1: $street1
      Street2: $street2
      City: $city
      State: $state
      PostalCode: $postalCode
    })
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    updateHomeAddress: (params = {}) => (mutate({
      variables: pick(params, [
        'street1',
        'street2',
        'city',
        'state',
        'postalCode',
      ]),
    })),
  }),
});
