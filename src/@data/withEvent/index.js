import { graphql } from 'react-apollo';
import eventQuery from './eventQuery';

export default graphql(eventQuery, {
  props: ({ data: { content } }) => ({
    content,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});

