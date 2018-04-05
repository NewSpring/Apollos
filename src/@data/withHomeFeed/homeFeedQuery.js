import gql from 'graphql-tag';
import { contentDataImagesFragment } from '@data/fragments';

const contentFragment = gql`
  fragment ContentForFeed on Content {
    id
    title
    channelName
    status
    meta {
      urlTitle
      siteId
      date
      channelId
    }
    parent {
      id
      meta {
        urlTitle
      }
      content {
        isLight
        ...ContentDataImagesFragment
        colors {
          value
          description
        }
      }
    }
    content {
      isLiked
      ...ContentDataImagesFragment
      isLight
      colors {
        value
        description
      }
    }
  }
  ${contentDataImagesFragment}
`;

export default gql`
  query HomeFeed($filters: [String]!, $limit: Int!, $skip: Int!, $cache: Boolean!) {
    feed: userFeed(filters: $filters, limit: $limit, skip: $skip, cache: $cache) {
      ... on Content {
        ...ContentForFeed
        parent {
          ...ContentForFeed
        }
      }
    }
  }
  ${contentFragment}
`;
