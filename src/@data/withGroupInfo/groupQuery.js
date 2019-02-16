import gql from 'graphql-tag';

// NOTE: removing ageRange for now
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
        isLiked
        name
        guid
        entityId
        type
        demographic
        description
        photo
        kidFriendly
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
