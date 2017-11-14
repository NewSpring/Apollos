import { graphql } from 'react-apollo';
import givingStatementMutation from './givingStatementMutation';

// Not too sure how this will work on native
export default graphql(givingStatementMutation, {
  props: ({ mutate }) => ({
    getPDF: variables => mutate({ variables }),
  }),
});

