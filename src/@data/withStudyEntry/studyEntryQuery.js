import gql from 'graphql-tag';
import { contentDataImagesFragment } from '@data/fragments';

export default gql`
  query GetStudyEntry($id: ID!) {
    content: node(id: $id) {
      ... on Content {
        id
        title
        status
        channelName
        meta {
          urlTitle
          siteId
          date
          actualDate
          channelId
        }
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
          children(channels: ["study_entries"]) {
            id
            title
            channelName
            meta {
              date
            }
            content {
              speaker
            }
          }
        }
        content {
          isLiked
          audio {
            duration
            file: s3
          }
          ...ContentDataImagesFragment
          scripture {
            book
            passage
          }
          body
          tags
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
