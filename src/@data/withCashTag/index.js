import { graphql } from 'react-apollo';
import cashTagQuery from './cashTagQuery';

export default graphql(cashTagQuery, {
  props: ({ data: { account } }) => ({
    account,
  }),
  options: (ownProps = {}) => ({
    variables: {
      tag: ownProps.tag,
    },
  }),
});

