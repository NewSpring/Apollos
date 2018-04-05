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
        images(sizes: ["large"]) {
          fileName
          fileType
          fileLabel
          url
        }
        isLight
        colors {
          value
          description
        }
      }
    }
    meta {
      urlTitle
    }
    content {
      isLiked
      isLight
      images(sizes: ["large"]) {
        fileName
        fileType
        fileLabel
        url
      }
      colors {
        value
        description
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
