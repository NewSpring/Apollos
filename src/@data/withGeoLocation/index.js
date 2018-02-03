import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash';

const geoQuery = gql`
query GeoLocate($origin: String, $destinations: String) {
  geolocate(origin: $origin, destinations: $destinations) {
    rows {
      elements {
        distance {
          text
          value
        }
        duration {
          text
          value
        }
        status
      }
    }
  }
}
`;

export default graphql(geoQuery, {
  options: (ownProps = {}) => ({
    variables: {
      origin: ownProps.origin || 20,
      destinations: (ownProps.destinations || []).join('|'),
    },
    skip: !(ownProps.origin && ownProps.destinations),
  }),
  props: ({ ownProps, data } = {}) => ({
    geoElements: get(data, 'geolocate.rows[0].elements') || [],
    isLoading: ownProps.isLoading || data.loading,
    refetch: data.refetch,
  }),
});

