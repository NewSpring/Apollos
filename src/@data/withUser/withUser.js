import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const QUERY = gql`
  query GetPersonData {
    person: currentPerson {
      id
      age
      birthDate
      birthDay
      birthMonth
      birthYear
      campus {
        name
        shortCode
        id
      }
      home {
        city
        country
        id
        zip
        state
        street1
        street2
      }
      firstName
      lastName
      nickName
      email
      photo
      impersonationParameter
      groups(groupTypeIds: [25, 60]) {
        id
        groupType
        name
        photo
        members {
          person {
            id
          }
          role
        }
      }
      phoneNumbers {
        number
        rawNumber
      }
    }
  }
`;

export default graphql(QUERY, {
  props: ({ data: { person } }) => ({
    user: person,
  }),
});
