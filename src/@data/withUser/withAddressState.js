import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const QUERY = gql`
  query GetAddressState($state: Int!, $country: Int!) {
    states: definedValues(id: $state, all: true) {
      description
      id
      _id
      value
    }
    countries: definedValues(id: $country, all: true) {
      description
      id
      _id
      value
    }
    person: currentPerson {
      id
      firstName
      nickName
      lastName
      email
      home {
        id
        street1
        street2
        city
        state
        zip
        country
      }
    }
  }
`;

export default graphql(QUERY, {
  options: {
    variables: {
      state: 28,
      country: 45,
    },
  },
  props({ ownProps, data }) {
    const {
      countries, states, person, loading,
    } = data;

    return {
      isLoading: ownProps.isLoading || loading,
      countries: (countries || []).map(c => ({ label: c.description, id: c.value })),
      states: (states || []).map(s => ({ label: s.description, id: s.value })),
      person,
    };
  },
});
