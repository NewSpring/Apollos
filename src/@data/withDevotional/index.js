import { graphql } from 'react-apollo';
import devotionalQuery from './devotionalQuery';

export default graphql(devotionalQuery, {
  props: ({ data: { error, content } }) => ({
    error,
    content,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});

