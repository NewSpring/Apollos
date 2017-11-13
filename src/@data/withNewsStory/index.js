import { graphql } from 'react-apollo';
import newsStoryQuery from './newsStoryQuery';

export default graphql(newsStoryQuery, {
  props: ({ data: { content } }) => ({
    content,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});

