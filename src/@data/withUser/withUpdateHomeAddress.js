import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import pick from 'lodash/pick';

export const MUTATION = gql`
  mutation updateHomeAddress(
    $street1: String
    $street2: String
    $city: String
    $stateId: String
    $zip: String
  ) {
    updateHomeAddress(
      input: {
        Street1: $street1
        Street2: $street2
        City: $city
        State: $stateId
        PostalCode: $zip
      }
    )
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    updateHomeAddress: (params = {}) =>
      mutate({
        variables: pick(params, ['street1', 'street2', 'city', 'stateId', 'zip']),
        optimisticResponse: {
          __typename: 'Mutation',
          updateHomeAddress: {
            id: params.id,
            __typename: 'Location',
            street1: params.street1,
            street2: params.street2,
            city: params.city,
            stateId: params.stateId,
            zip: params.zip,
          },
        },
      }),
  }),
});
