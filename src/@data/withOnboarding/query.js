import gql from 'graphql-tag';

export default gql`
  query IsOnboarded {
    onboarded @client
  }
`;
