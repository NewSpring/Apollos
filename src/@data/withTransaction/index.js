import { graphql } from 'react-apollo';
import transactionQuery from './transactionQuery';

export default graphql(transactionQuery, {
  props: ({ data: { content } }) => ({
    content,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});

