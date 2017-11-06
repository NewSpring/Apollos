import { gql } from 'react-apollo';

export default gql`
  query GetPersonForSettings {
    person: currentPerson(cache: false) {
      firstName
      lastName
      nickName
      photo
      birthDay
      birthMonth
      birthYear
      home {
        street1
        street2
        state
        city
        zip
        country
      }
    }
  }
`;
