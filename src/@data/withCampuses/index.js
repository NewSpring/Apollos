import { graphql } from 'react-apollo';
import campusesQuery from './campusesQuery';

export default graphql(campusesQuery, {
  props: ({ data } = {}) => ({
    campuses: data.campuses,
    isLoading: data.loading,
  }),
});

