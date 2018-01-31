import { graphql } from 'react-apollo';
import taggedContentQuery from './taggedContentQuery';

export default graphql(taggedContentQuery, {
  props: ({ data: { entries, loading, refetch }, ownProps }) => ({
    content: entries,
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

