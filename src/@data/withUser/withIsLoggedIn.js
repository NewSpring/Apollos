import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const QUERY = gql`
  query IsLoggedIn {
    person: currentPerson {
      id
    }
  }
`;

export default graphql(QUERY, {
  props: ({
    data: {
      error, person, loading, refetch,
    }, ownProps,
  }) => ({
    error: error || ownProps.error,
    isLoggedIn: person && Boolean(person.id),
    isLoading: ownProps.isLoading || loading,
    refetch,
  }),
  options: {
    fetchPolicy: 'cache-and-network',
  },
});
