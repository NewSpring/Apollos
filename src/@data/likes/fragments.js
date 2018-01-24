import gql from 'graphql-tag';

export const contentCard = gql`
  fragment ContentCard on Content {
    __typename
    id
    title
    channelName
    content {
      isLiked
      images(sizes: ["large"]) {
        fileName
        fileType
        fileLabel
        url
        size
      }
    }
  }
`;

// TODO: Add isLiked to groups
export const groupCard = gql`
  fragment GroupCard on Group {
    __typename
    id
    name
    photo
  }
`;
