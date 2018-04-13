import { graphql } from 'react-apollo';
import eventQuery from './eventQuery';

export default graphql(eventQuery, {
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

