import gql from 'graphql-tag';
import { contentDataImagesFragment } from '@data/fragments';

export default gql`
  query getAlbums($limit: Int!, $skip: Int!) {
    library: content(channel: "newspring_albums", limit: $limit, skip: $skip) {
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
        ...ContentDataImagesFragment
        tracks {
          file: s3
        }
      }
    }
  }
  ${contentDataImagesFragment}
`;
