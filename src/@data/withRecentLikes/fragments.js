import gql from 'graphql-tag';

export const contentCard = gql`
  fragment ContentCard on Content {
    __typename
    id
    title
    category: channelName
    channelName
    parent {
      channelName
      id
      content {
        images(sizes: ["medium"]) {
          url
          label
          fileLabel
          id
        }
      }
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
`;

export const groupCard = gql`
  fragment GroupCard on Group {
    __typename
    id
    name
    photo
  }
`;
