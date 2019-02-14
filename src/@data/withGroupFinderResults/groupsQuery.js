import gql from 'graphql-tag';

// NOTE: I'm removing ageRange from the query for now, until the resolver fix makes it to production
export default gql`
  query GroupFinder(
    $query: String
    $tags: [String]
    $limit: Int
    $skip: Int
    $campus: String
    $campuses: [String]
    $latitude: Float
    $longitude: Float
    $zip: String
    $schedules: [Int]
  ) {
    content: groups(
      query: $query
      attributes: $tags
      limit: $limit
      offset: $skip
      campus: $campus
      campuses: $campuses
      latitude: $latitude
      longitude: $longitude
      zip: $zip
      schedules: $schedules
    ) {
      count
      results {
        id
        name
        title: name
        entityId
        type
        kidFriendly
        demographic
        description
        photo
        distance
        schedule {
          description
        }
        locations {
          location {
            latitude
            longitude
          }
        }
        tags {
          id
          value
        }
        campus {
          name
          entityId
        }
      }
    }
  }
`;
