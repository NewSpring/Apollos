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
  props({ data: { content, loading } } = {}) {
    return {
      isLoading: loading,
      content,
    };
  },
});
