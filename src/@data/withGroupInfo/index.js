import { graphql } from 'react-apollo';
import groupQuery from './groupQuery';

export default graphql(groupQuery, {
  props: ({ ownProps, data }) => ({
    error: data.error || ownProps.error,
    group: data.group,
    person: data.person,
    isLoading: ownProps.isLoading || data.loading,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});
