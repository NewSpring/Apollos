import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation setBillingPerson($firstName: String!, $lastName: String!, $email: String!, $campusId: Number!) {
    setBillingPerson(firstName: $firstName, lastName: $lastName, email: $email, campusId: $campusId) @client
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    setBillingPerson: props => (mutate({
      variables: {
        firstName: props.firstName,
        lastName: props.lastName,
        email: props.email,
        campusId: props.campusId,
      },
    })),
  }),
});
