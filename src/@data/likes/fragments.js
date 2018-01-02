import gql from 'graphql-tag';

export const contentCard = gql`
  fragment ContentCard on Content {
    __typename
    entryId: id
    parent {
      entryId: id
      content {
        isLiked
      }
    }
    content {
      isLiked
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
