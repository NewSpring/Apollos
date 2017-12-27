import gql from 'graphql-tag';

const contentFragment = gql`
  fragment ContentForFeed on Content {
    id
    title
    channelName
    status
    meta {
      siteId
      date
      channelId
    }
    parent {
      id
      content {
        isLight
        colors {
          value
          description
        }
      }
    }
    content {
      isLiked
      images(sizes: ["large"]) {
        fileName
        fileType
        fileLabel
        url
        size
      }
      isLight
      colors {
        value
        description
      }
    }
  }
`;

export default gql`
  query HomeFeed($filters: [String]!, $options: String!, $limit: Int!, $skip: Int!, $cache: Boolean!) {
    feed: userFeed(filters: $filters, options: $options, limit: $limit, skip: $skip, cache: $cache) {
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
