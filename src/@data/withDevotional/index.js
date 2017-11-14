import { graphql } from 'react-apollo';
import devotionalQuery from './devotionalQuery';

export default graphql(devotionalQuery, {
  props: ({ data: { content } }) => ({
    content,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});

