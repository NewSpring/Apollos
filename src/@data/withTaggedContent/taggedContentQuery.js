import gql from 'graphql-tag';

export default gql`
  query GetTaggedContent($tagName: String!, $limit: Int, $includeChannels: [String]) {
    entries: taggedContent(
      tagName: $tagName,
      limit: $limit,
      includeChannels: $includeChannels,
      cache: false
    ) {
      entryId: id
      title
      channelName
      status
      meta {
        summary
        urlTitle
      }
      content {
        hasLike
        images(sizes: ["large"]) {
          fileName
          fileType
          fileLabel
          url
        }
      }
    }
  }
`;
