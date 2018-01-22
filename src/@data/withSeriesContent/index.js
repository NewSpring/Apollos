import { graphql } from 'react-apollo';
import seriesContentQuery from './seriesContentQuery';

export default graphql(seriesContentQuery, {
  props: ({ ownProps, data: { content, loading } }) => ({
    content,
    isLoading: ownProps.isLoading || loading,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});
