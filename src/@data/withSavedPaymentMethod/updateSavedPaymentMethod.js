/* eslint-disable no-underscore-dangle */
import Client from '@data/Client';
import { QUERY } from './withSavedPaymentMethod';

export default function (savedPaymentMethod) {
  const id = `${savedPaymentMethod.__typename}:${savedPaymentMethod.id}`;
  const state = Client.readFragment({
    id,
    query: QUERY,
  });
  Client.writeFragment({
    id,
    query: QUERY,
    data: {
      ...state,
      ...savedPaymentMethod,
    },
  });
}
