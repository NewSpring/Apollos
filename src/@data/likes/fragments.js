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
        ...ContentDataImagesFragment
      }
    }
    meta {
      urlTitle
    }
    content {
      isLiked
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
