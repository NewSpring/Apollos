import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import identifyCategory from '@data/utils/identifyCategory';
import { contentDataImagesFragment } from '@data/fragments';

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
        ...ContentDataImagesFragment
      }
    }
  }
  ${contentDataImagesFragment}
`;

export default graphql(QUERY, {
  props: ({
    data: {
      error, entries, loading, refetch,
    }, ownProps,
  }) => ({
    error: error || ownProps.error,
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

