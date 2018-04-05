import { graphql } from 'react-apollo';
import storyQuery from './storyQuery';

export default graphql(storyQuery, {
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

