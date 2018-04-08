import gql from 'graphql-tag';
import { contentDataImagesFragment } from '@data/fragments';

export default gql`
  query getNews($id: ID!) {
    content: node(id: $id) {
      id
      ... on Content {
        id
        title
        status
        channelName
        meta {
          urlTitle
          siteId
          date
          channelId
        }
        content {
          isLiked
          body
          video {
            embedUrl
          }
          tags
          ...ContentDataImagesFragment
        }
      }
    }
  }
  ${contentDataImagesFragment}
`;
