import { graphql } from 'react-apollo';
import givingDashboardQuery from './givingDashboardQuery';

export default graphql(givingDashboardQuery, {
  props: ({ data }) => (data),
  options: (ownProps = {}) => ({
    variables: {
      filters: ownProps.filters || ['GIVING_DASHBOARD'],
    },
  }),
});

