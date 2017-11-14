import gql from 'graphql-tag';

export default gql`
  query GetCampuses {
    campuses {
      id
      guid
      name
      services
      url
      location {
        street1
        street2
        city
        state
        zip
      }
    }
  }
`;
