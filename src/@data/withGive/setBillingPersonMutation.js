import gql from 'graphql-tag';

export default gql`
  mutation setBillingPerson($firstName: String!, $lastName: String!, $email: String!, $campusId: Number!) {
    setBillingPerson(firstName: $firstName, lastName: $lastName, email: $email, campusId: $campusId) @client
  }
`;
