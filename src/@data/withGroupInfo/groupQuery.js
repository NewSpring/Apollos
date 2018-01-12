import gql from 'graphql-tag';

export default gql`
  query GetGroup($id: ID!) {
    person: currentPerson {
      id
      firstName
      nickName
      impersonationParameter
    }
    group: node(id: $id) {
      id
      ... on Group {
        name
        guid
        entityId
        type
        demographic
        description
        photo
        kidFriendly
        ageRange
        campus { name }
        tags { id, value }
        locations { location { city, state, latitude, longitude } }
        schedule { description }
        members {
          role
          person { id, photo, firstName, nickName, lastName }
        }
        groupType
      }
    }
  }
`;
