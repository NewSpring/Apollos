import gql from 'graphql-tag';
import { contentDataImagesFragment } from '@data/fragments';

export default gql`
  query getStories($limit: Int!, $skip: Int!) {
    content(channel: "stories", limit: $limit, skip: $skip) {
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
        colors {
          value
          description
        }
        isLight
      }
    }
  }
  ${contentDataImagesFragment}
`;
