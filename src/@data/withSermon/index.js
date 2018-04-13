import { graphql } from 'react-apollo';
import sermonQuery from './sermonQuery';

export default graphql(sermonQuery, {
  props: ({ data: { error, content, loading } }) => ({
    error,
    content,
    isLoading: loading,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});
