import gql from 'graphql-tag';
import { contentDataImagesFragment } from '@data/fragments';

export default gql`
  query getArticle($id: ID!) {
    content: node(id: $id) {
      id
      ... on Content {
        title
        status
        channelName
        authors
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
