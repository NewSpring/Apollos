import { graphql } from 'react-apollo';
import sermonQuery from './sermonQuery';

export default graphql(sermonQuery, {
  props: ({ data: { content } }) => ({
    content,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});

