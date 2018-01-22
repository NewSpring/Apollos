import { graphql } from 'react-apollo';
import financialAccountsQuery from './financialAccountsQuery';

export default graphql(financialAccountsQuery, {
  props: ({ ownProps, data }) => ({
    accounts: data.accounts,
    isLoading: ownProps.isLoading || data.loading,
  }),
});

