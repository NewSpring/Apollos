import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const QUERY = gql`
  query GetCampuses {
    campuses {
      id
      guid
      name
      services
      url
      location {
        street1
        street2
        city
        state
        zip
      }
    }
  }
`;

export default graphql(QUERY, {
  props: ({ ownProps, data } = {}) => ({
    error: data.error || ownProps.error,
    campuses: data.campuses,
    isLoading: ownProps.isLoading || data.loading,
  }),
});

