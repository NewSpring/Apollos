import moment from 'moment';

// TODO: This should happen on the server
export default function transactionToChartDataMapper(transactions = []) {
  const data = [
    { month: 'January', amount: 0, tick: 'J' },
    { month: 'February', amount: 0, tick: 'F' },
    { month: 'March', amount: 0, tick: 'M' },
    { month: 'April', amount: 0, tick: 'A' },
    { month: 'May', amount: 0, tick: 'M' },
    { month: 'June', amount: 0, tick: 'J' },
    { month: 'July', amount: 0, tick: 'J' },
    { month: 'August', amount: 0, tick: 'A' },
    { month: 'September', amount: 0, tick: 'S' },
    { month: 'October', amount: 0, tick: 'O' },
    { month: 'November', amount: 0, tick: 'N' },
    { month: 'December', amount: 0, tick: 'D' },
  ];

  let total = 0;
  const accounts = {};

  transactions.forEach((transaction) => {
    // iterate over every transaction, and sum up the months
    const month = moment(new Date(transaction.date)).format('M');
    if (!transaction.details || !transaction.details.length) return;

    data[Number(month) - 1].amount += transaction.details
      .reduce((prev, { amount }) => prev + amount, 0);

    total += transaction.details.reduce((prev, { amount }) => prev + amount, 0);
    transaction.details.forEach(({ amount, account }) => {
      if (!account) return;
      if (!accounts[account.name]) accounts[account.name] = 0;
      accounts[account.name] += amount;
    });
  });

  return {
    total,
    accounts,
    data,
  };
}
