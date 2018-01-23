import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const QUERY = gql`
  query CurrentPerson {
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
      followedTopics
    }
  }
`;

export default graphql(QUERY, {
  props: ({ ownProps, data: { person, loading, refetch } }) => ({
    user: person,
    isLoading: ownProps.isLoading || loading,
    refetch,
  }),
  options: {
    fetchPolicy: 'cache-and-network',
  },
});
