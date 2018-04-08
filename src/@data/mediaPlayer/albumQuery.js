import gql from 'graphql-tag';
import { contentDataImagesFragment } from '@data/fragments';

export default gql`
  query getAlbum($id: ID!) {
    playlist: node(id: $id) {
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
          tracks {
            title
            duration
            file: s3
          }
          ...ContentDataImagesFragment
          colors {
            value
            description
          }
          isLight
        }
      }
    }
  }
  ${contentDataImagesFragment}
`;
