import gql from 'graphql-tag';
import { contentDataImagesFragment } from '@data/fragments';

export default gql`
  query GetPromotions($setName: String!) {
    content: lowReorderSets(setName: $setName) {
      title
      id
      status
      channelName
      meta {
        urlTitle
        date
      }
      content {
        ...ContentDataImagesFragment
        isLiked
        colors {
          value
          description
        }
        isLight
      }
    }
  }
  ${contentDataImagesFragment}
`;
