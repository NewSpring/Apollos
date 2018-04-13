import { graphql } from 'react-apollo';
import relatedContentQuery from './relatedContentQuery';

export default graphql(relatedContentQuery, {
  options(ownProps) {
    return {
      variables: {
        tags: ownProps.tags || [],
        includeChannels: ownProps.includeChannels || [],
        limit: ownProps.limit || 3,
        excludedIds: ownProps.excludedIds || [],
      },
    };
  },
  props({ ownProps, data: { error, content, loading } } = {}) {
    return {
      error: error || ownProps.error,
      isLoading: ownProps.isLoading || loading,
      content,
    };
  },
});
