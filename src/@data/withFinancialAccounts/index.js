import { graphql } from 'react-apollo';
import financialAccountsQuery from './financialAccountsQuery';

export default graphql(financialAccountsQuery, {
  props: ({ ownProps, data }) => ({
    error: data.error,
    accounts: data.accounts,
    isLoading: ownProps.isLoading || data.loading,
  }),
});

