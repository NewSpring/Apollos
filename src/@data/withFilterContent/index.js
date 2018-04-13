import { graphql } from 'react-apollo';
import filterContentQuery from './filterContentQuery';

export default graphql(filterContentQuery, {
  props: ({ data: { error, family } }) => ({
    error,
    family,
  }),
});

