import gql from 'graphql-tag';

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
  }
`;
