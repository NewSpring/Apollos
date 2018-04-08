import gql from 'graphql-tag';
import { contentDataImagesFragment } from '@data/fragments';

export default gql`
  query getSermon($id: ID!) {
    content: node(id: $id) {
      ... on Content {
        id
        title
        status
        channelName
        parent {
          id
          title
          meta {
            urlTitle
          }
          content {
            isLiked
            isLight
            colors {
              value
              description
            }
            ...ContentDataImagesFragment
          }
          children(channels: ["sermons"]) {
            id
            title
            channelName
            meta {
              date
            }
            content {
              speaker
              colors {
                value
                description
              }
              isLight
            }
          }
        }
        meta {
          urlTitle
          siteId
          date
          actualDate
          channelId
        }
        content {
          isLiked
          audio {
            duration
            file: s3
          }
          description
          speaker
          video {
            embedUrl
          }
        }
      }
    }
  }
  ${contentDataImagesFragment}
`;
