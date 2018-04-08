import { graphql } from 'react-apollo';
import articleQuery from './articleQuery';

export default graphql(articleQuery, {
  props: ({ data: { content, loading }, ownProps }) => ({
    content,
    isLoading: ownProps.isLoading || loading,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});
