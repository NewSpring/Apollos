import gql from 'graphql-tag';
import { contentDataImagesFragment } from '@data/fragments';

export default gql`
  query getSeries($limit: Int!, $skip: Int!){
    content(channel: "series_newspring", limit: $limit, skip: $skip) {
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
        ...ContentDataImagesFragment
        isLight
        colors {
          value
          description
        }
      }
    }
  }
  ${contentDataImagesFragment}
`;
