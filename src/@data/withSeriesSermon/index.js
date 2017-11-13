import { graphql } from 'react-apollo';
import seriesSermonQuery from './seriesSermonQuery';

export default graphql(seriesSermonQuery, {
  props: ({ data: { content } }) => ({
    content,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});

