import { graphql } from 'react-apollo';
import storyQuery from './storyQuery';

export default graphql(storyQuery, {
  props: ({ data: { content } }) => ({
    content,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});

