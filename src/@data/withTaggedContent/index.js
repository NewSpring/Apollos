import { graphql } from 'react-apollo';
import identifyCategory from '@data/utils/identifyCategory';
import taggedContentQuery from './taggedContentQuery';

export default graphql(taggedContentQuery, {
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

