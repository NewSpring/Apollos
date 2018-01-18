import Client from '@data/Client';
import remove from 'lodash/fp/remove';
import { QUERY } from './withSavedPaymentMethods';

// eslint-disable-next-line eqeqeq
const removeById = (_id, arr) => remove(pm => (pm.id == _id))(arr);

export default function (id) {
  const state = Client.readQuery({
    query: QUERY,
  });

  Client.writeQuery({
    query: QUERY,
    data: {
      ...state,
      savedPaymentMethods: removeById(id, state.savedPaymentMethods),
    },
  });
}
