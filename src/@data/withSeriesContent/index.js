import { graphql } from 'react-apollo';
import seriesContentQuery from './seriesContentQuery';

export default graphql(seriesContentQuery, {
  props: ({ data: { content } }) => ({
    content,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});

