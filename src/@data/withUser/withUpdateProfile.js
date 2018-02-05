import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import pick from 'lodash/pick';

export const MUTATION = gql`
  mutation updateProfile(
    $nickName: String,
    $firstName: String,
    $lastName: String,
    $email: String,
    $birthMonth: String,
    $birthDay: String,
    $birthYear: String,
    $campus: ID
  ) {
    updateProfile(input: {
      NickName: $nickName
      FirstName: $firstName
      LastName: $lastName
      Email: $email
      BirthMonth: $birthMonth
      BirthDay: $birthDay
      BirthYear: $birthYear
      Campus: $campus
    })
  }
`;

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    updateProfile: (params = {}) => (mutate({
      variables: pick(params, [
        'nickName',
        'firstName',
        'lastName',
        'email',
        'birthMonth',
        'birthDay',
        'birthYear',
        'campus',
      ]),
    })),
  }),
});
