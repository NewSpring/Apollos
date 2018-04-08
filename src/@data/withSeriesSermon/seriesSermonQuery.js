import gql from 'graphql-tag';
import { contentDataImagesFragment } from '@data/fragments';

export default gql`
  query GetSermonsFromSeries($id: ID!) {
    content: node(id: $id) {
      ... on Content {
        sermons: children(channels: ["sermons"]) {
          id
          title
          status
          channelName
          parent {
            id
            content {
              isLiked
              isLight
              colors {
                value
                description
              }
              ...ContentDataImagesFragment
            }
            meta {
              urlTitle
            }
          }
          meta {
            urlTitle
            siteId
            date
            channelId
          }
          content {
            isLiked
            speaker
          }
        }
      }
    }
  }
  ${contentDataImagesFragment}
`;
