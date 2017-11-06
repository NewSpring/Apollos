import { gql } from 'react-apollo';

export default gql`
  query PullPhoneNumbers {
    currentPerson {
      phoneNumbers {
        number
        rawNumber
      }
    }
  }
`;
