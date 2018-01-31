import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const QUERY = gql`
  query GetTaggedContent {
    entries: taggedContent(
      tagName: "giving",
      limit: 2,
      includeChannels: ["articles"],
      cache: false
    ) {
      id
      title
      channelName
      status
      meta {
        summary
        urlTitle
      }
      content {
        isLiked
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

export default graphql(QUERY, {
  props: ({ data: { entries, loading } }) => ({
    entries,
    isLoading: loading,
  }),
});

