import { graphql } from 'react-apollo';
import cashTagQuery from './cashTagQuery';

export default graphql(cashTagQuery, {
  props: ({ data: { error, account } }) => ({
    error,
    account,
  }),
  options: (ownProps = {}) => ({
    variables: {
      tag: ownProps.tag,
    },
  }),
});

