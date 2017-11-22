import gql from 'graphql-tag';

export default gql`
  mutation forgotUserPassword($email: String!, $sourceURL: String!) {
    forgotUserPassword(username: $email, sourceURL: $sourceURL)
  }
`;
