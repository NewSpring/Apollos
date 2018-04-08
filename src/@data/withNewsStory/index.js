import { graphql } from 'react-apollo';
import newsStoryQuery from './newsStoryQuery';

export default graphql(newsStoryQuery, {
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

