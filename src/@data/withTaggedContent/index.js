import { graphql } from 'react-apollo';
import taggedContentQuery from './taggedContentQuery';

export default graphql(taggedContentQuery, {
  props: ({ data: { entries } }) => ({
    entries,
  }),
  options: (ownProps = {}) => ({
    variables: {
      tagName: ownProps.tagName,
      limit: ownProps.limit || 2,
      includeChannels: ownProps.includeChannels || ['articles'],
    },
  }),
});

