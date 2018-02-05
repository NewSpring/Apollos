import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import identifyCategory from '@data/utils/identifyCategory';

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
  props: ({ data: { entries, loading, refetch }, ownProps }) => ({
    content: entries && entries.map(identifyCategory),
    isLoading: ownProps.isLoading || loading,
    refetch,
  }),
  options: (ownProps = {}) => ({
    variables: {
      tagName: ownProps.tagName,
      limit: ownProps.limit || 2,
      includeChannels: ownProps.includeChannels || ['articles'],
    },
  }),
});

