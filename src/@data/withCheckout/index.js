import { graphql } from 'react-apollo';
import checkoutQuery from './checkoutQuery';

export default graphql(checkoutQuery, {
  options: { variables: { state: 28, country: 45 } },
  props({ data }) {
    const {
      campuses = [],
      countries = [],
      states = [],
      loading,
    } = data;

    return ({
      isLoading: loading,
      campuses: campuses.map(x => ({ label: x.name, value: x.id })),
      countries: countries.map(x => ({ label: x.name, value: x.value })),
      states: states.map(x => ({ label: x.name, value: x.value })),
    });
  },
});

