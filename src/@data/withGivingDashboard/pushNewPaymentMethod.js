import Client from '@data/Client';
import givingDashboardQuery from './givingDashboardQuery';

export default function (savedPaymentMethod) {
  if (!savedPaymentMethod) return;
  const state = Client.readQuery({
    query: givingDashboardQuery,
    variables: {
      filters: ['GIVING_DASHBOARD'],
    },
  });
  Client.writeQuery({
    query: givingDashboardQuery,
    variables: {
      filters: ['GIVING_DASHBOARD'],
    },
    data: {
      ...state,
      savedPaymentMethods: [
        ...state.savedPaymentMethods,
        savedPaymentMethod,
      ],
    },
  });
}
