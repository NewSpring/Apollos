import { graphql } from 'react-apollo';
import articleQuery from './articleQuery';

export default graphql(articleQuery, {
  props: ({ data: { content } }) => ({
    content,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});

