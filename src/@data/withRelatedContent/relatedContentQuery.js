import gql from 'graphql-tag';
import { contentDataImagesFragment } from '@data/fragments';

export default gql`
  query GetRelatedContent($tags: [String], $includeChannels: [String], $limit: Int, $excludedIds: [String]) {
    content: taggedContent(tags: $tags, limit: $limit, includeChannels: $includeChannels, excludedIds: $excludedIds) {
      entryId: id
      id
      title
      channel: channelName
      channelName
      parent {
        entryId: id
        content {
          colors {
            value
            description
          }
          isLight
          ...ContentDataImagesFragment
        }
        meta {
          urlTitle
        }
      }
      meta {
        urlTitle
      }
      content {
        colors {
          value
          description
        }
        isLight
        ...ContentDataImagesFragment
      }
    }
  }
  ${contentDataImagesFragment}
`;
