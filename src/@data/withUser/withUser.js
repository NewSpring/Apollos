import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const QUERY = gql`
  query CurrentPerson {
    user: currentPerson(cache: false) {
      id
      age
      birthDay
      birthMonth
      birthYear
      campus(cache: false) {
        name
        shortCode
        id
      }
      home(cache: false) {
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
  props: ({
    ownProps, data: {
      error, user, loading, refetch,
    },
  }) => ({
    error: error || ownProps.error,
    user: user || {},
    isLoading: ownProps.isLoading || loading,
    refetch,
  }),
  options: {
    fetchPolicy: 'cache-and-network',
  },
});
