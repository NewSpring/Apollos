import { graphql } from 'react-apollo';
import storyQuery from './storyQuery';

export default graphql(storyQuery, {
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

