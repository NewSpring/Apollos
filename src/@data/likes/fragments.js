import gql from 'graphql-tag';
import { contentDataImagesFragment } from '@data/fragments';

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
        isLight
        colors {
          value
          description
        }
        ...ContentDataImagesFragment
      }
    }
    meta {
      urlTitle
    }
    content {
      isLiked
      isLight
      colors {
        value
        description
      }
      ...ContentDataImagesFragment
    }
  }
  ${contentDataImagesFragment}
`;

export const groupCard = gql`
  fragment GroupCard on Group {
    __typename
    id
    name
    photo
  }
`;
