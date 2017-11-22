import gql from 'graphql-tag';

export default gql`
  mutation resetUserPassword($token: String!, $newPassword: String!) {
    resetUserPassword(token: $token, newPassword: $newPassword)
  }
`;
