import { graphql } from 'react-apollo';
import groupQuery from './groupQuery';

export default graphql(groupQuery, {
  props: ({ data }) => ({
    group: data.group,
    person: data.person,
    isLoading: data.loading,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});
