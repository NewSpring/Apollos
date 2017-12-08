import moment from 'moment';

// TODO: Refactor / review
// LEFT OFF HERE
export default function formatPersonDetails(state) {
  console.log(state);

  const total = state.contributions
    .reduce((runningTotal, contribution) => (runningTotal + contribution.amount), 0);

  // here we format data for the NMI processing
  const joinedData = {
    amount: total,
    billing: {
      'first-name': state.firstName,
      'last-name': state.lastName,
      email: state.email,
      address1: state.street1,
      address2: state.street2,
      city: state.city,
      state: state.state,
      postal: state.zipCode,
    },
    'merchant-defined-field-2': state.campusId,
  };

  // Looks like this can be guest or savedPayment?
  // if (state.transactionType === 'savedPayment') delete joinedData.amount;

  if (state.frequencyId === 'once') {
    joinedData.plan = {
      payments: 0,
      amount: total,
    };

    switch (state.frequencyId) {
      case 'yearly':
        joinedData.plan.payments = 1;
        joinedData.plan['month-frequency'] = 12;
        joinedData.plan['day-of-month'] = state.startDate
          ? moment(state.startDate).date()
          : moment().date();
        break;
      case 'weekly':
        joinedData.plan['day-frequency'] = 7;
        break;
      case 'biweekly':
        joinedData.plan['day-frequency'] = 14;
        break;
      case 'monthly':
        joinedData.plan['month-frequency'] = 1;
        joinedData.plan['day-of-month'] = state.startDate
          ? moment(state.startDate).date()
          : moment().date();
        break;
      default:
        break;
    }

  //   joinedData['start-date'] = schedule.start
  //     ? moment(schedule.start).format('YYYYMMDD')
  //     : moment().add(1, 'days').format('YYYYMMDD');
  //   joinedData['merchant-defined-field-3'] = joinedData['start-date'];

  //   // This isn't super well organized
  //   // in the beginning we didn't support multiple accounts
  //   // on a schedule
  //   // now we do but we have to support existing builds so
  //   // we create a comma sep string and split on heighliner
  //   joinedData['merchant-defined-field-1'] = Object.keys(transactions).join(',');

  //   // in order to line up the amounts with the funds, we store the amounts
  //   // in a matching comma sep string
  //   joinedData['merchant-defined-field-4'] = Object.keys(transactions)
  //     .map(key => transactions[key].value)
  //     .join(',');

  // SINGLE
  } else if (false) {
  //   joinedData.product = [];
  //   // eslint-disable-next-line no-restricted-syntax, guard-for-in
  //   for (const transaction in transactions) {
  //     joinedData.product.push({
  //       quantity: 1,
  //       'product-code': transaction,
  //       description: transactions[transaction].label,
  //       'total-amount': transactions[transaction].value,
  //       'unit-cost': transactions[transaction].value,
  //     });
  //   }
  }

  // if (savedAccount.id) {
  //   joinedData.savedAccount = savedAccount.id;
  //   joinedData.savedAccountName = savedAccount.name;
  // }

  return joinedData;
}
