import gql from 'graphql-tag';
import { contentDataImagesFragment } from '@data/fragments';

export default gql`
  query GetNews($limit: Int!, $skip: Int!) {
    content(channel: "news", limit: $limit, skip: $skip) {
      id
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
        ...ContentDataImagesFragment
        video {
          embedUrl
        }
        isLight
        colors {
          value
          description
        }
      }
    }
  }
  ${contentDataImagesFragment}
`;
