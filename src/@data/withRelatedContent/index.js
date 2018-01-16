import { graphql } from 'react-apollo';
import relatedContentQuery from './relatedContentQuery';

const defaultArray = [];
export default graphql(relatedContentQuery, {
  options: ownProps => ({
    variables: {
      tags: ownProps.tags || defaultArray,
      includeChannels: ownProps.includeChannels || defaultArray,
      limit: ownProps.limit || 3,
      excludedIds: ownProps.excludedIds || defaultArray,
    },
  }),
});
