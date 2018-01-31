import { compose, withState, withHandlers } from 'recompose';
import moment from 'moment';
import withTransactions from './withTransactions';

const withTransactionsEngine = compose(
  withState('dateRange', 'setDateRange'),
  withHandlers({
    setFilterDateRange: ({ setDateRange }) => ({ startDate, endDate }, format) => {
      setDateRange({
        startDate: startDate ? moment(startDate, format).format('MM/DD/YYYY') : '',
        endDate: startDate ? moment(endDate, format).format('MM/DD/YYYY') : '',
      });
    },
  }),
  withTransactions,
);

export default withTransactionsEngine;
