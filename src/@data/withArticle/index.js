import { graphql } from 'react-apollo';
import articleQuery from './articleQuery';

export default graphql(articleQuery, {
  props: ({ data: { error, content, loading }, ownProps }) => ({
    error: error || ownProps.error,
    content,
    isLoading: ownProps.isLoading || loading,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});
