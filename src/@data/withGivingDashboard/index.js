import { graphql } from 'react-apollo';
import givingDashboardQuery from './givingDashboardQuery';

export default graphql(givingDashboardQuery, {
  props: ({ data: { content } }) => ({
    content,
  }),
  options: (ownProps = {}) => ({
    variables: {
      filters: ownProps.filters || ['GIVING_DASHBOARD'],
    },
  }),
});

