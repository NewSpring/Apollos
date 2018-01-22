import { graphql } from 'react-apollo';
import campusesQuery from './campusesQuery';

export default graphql(campusesQuery, {
  props: ({ ownProps, data } = {}) => ({
    campuses: data.campuses,
    isLoading: ownProps.isLoading || data.loading,
  }),
});

