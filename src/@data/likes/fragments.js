import gql from 'graphql-tag';

export const contentCard = gql`
  fragment ContentCard on Content {
    __typename
    id
    title
    channelName
    parent {
      channelName
      id
      meta {
        urlTitle
      }
      content {
        images(sizes: ["medium"]) {
          url
          label
          fileLabel
          id
        }
      }
    }
    meta {
      urlTitle
    }
    content {
      isLiked
      images(sizes: ["medium"]) {
        url
        label
        fileLabel
        id
      }
    }
  }
`;

export const groupCard = gql`
  fragment GroupCard on Group {
    __typename
    id
    name
    photo
  }
`;
