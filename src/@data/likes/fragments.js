import gql from 'graphql-tag';

export const contentCard = gql`
  fragment ContentCard on Content {
    __typename
    entryId: id
    content {
      isLiked
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
