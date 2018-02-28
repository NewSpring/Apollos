import Client from '@data/Client';

export default () => {
  // Before we have sent the reset action to the store,
  // we can no longer rely on the results returned by in-flight
  // requests since these may depend on values that previously existed
  // in the data portion of the store. So, we cancel the promises and observers
  // that we have issued so far and not yet resolved (in the case of
  // queries).
  Client.queryManager.fetchQueryPromises.forEach(({ reject }) => {
    reject(new Error('Store reset while query was in flight.'));
  });

  const resetIds: string[] = [];
  Client.queryManager.queries.forEach(({ observableQuery }, queryId) => {
    if (observableQuery) resetIds.push(queryId);
  });

  Client.queryManager.queryStore.reset(resetIds);
  Client.queryManager.mutationStore.reset();

  // begin removing data from the store
  // returns a Promise
  return Client.queryManager.dataStore.reset();
};
