import { gql } from 'react-apollo';

export default gql`
  query GroupFinder(
    $query: String
    $tags: [String]
    $limit: Int
    $offset: Int
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
      offset: $offset
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
        entityId
        type
        kidFriendly
        demographic
        description
        photo
        ageRange
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
