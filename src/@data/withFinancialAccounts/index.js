import { graphql } from 'react-apollo';
import financialAccountsQuery from './financialAccountsQuery';

export default graphql(financialAccountsQuery, {
  props: ({ data }) => ({
    accounts: data.accounts,
    isLoading: data.loading,
  }),
});

