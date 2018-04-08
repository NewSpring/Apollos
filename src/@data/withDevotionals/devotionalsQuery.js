import gql from 'graphql-tag';
import { contentDataImagesFragment } from '@data/fragments';

export default gql`
  query getDevotionals($limit: Int!, $skip: Int!) {
    content(channel: "devotionals", limit: $limit, skip: $skip) {
      id
      id
      title
      status
      channelName
      meta {
        urlTitle
        siteId
        date
        channelId
      }
      content {
        isLiked
        body
        ...ContentDataImagesFragment

      }
    }
  }
  ${contentDataImagesFragment}
`;
