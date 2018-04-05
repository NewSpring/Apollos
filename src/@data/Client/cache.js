import { InMemoryCache, IntrospectionFragmentMatcher, defaultDataIdFromObject } from 'apollo-cache-inmemory';

const cache = new InMemoryCache({
  dataIdFromObject(obj) {
    // eslint-disable-next-line no-underscore-dangle
    if (obj.entryId) return `${obj.__typename}:${obj.entryId}`;
    return defaultDataIdFromObject(obj);
  },
  fragmentMatcher: new IntrospectionFragmentMatcher({
    // NOTE: Introspection result goes here!
    // More Info: ./README.md
    introspectionQueryResultData: JSON.parse('{"__schema":{"types":[{"kind":"INTERFACE","name":"Node","possibleTypes":[{"name":"User"},{"name":"Content"},{"name":"Campus"},{"name":"Location"},{"name":"File"},{"name":"Navigation"},{"name":"Person"},{"name":"PhoneNumber"},{"name":"Group"},{"name":"DefinedValue"},{"name":"GroupSchedule"},{"name":"GroupMember"},{"name":"GroupLocation"},{"name":"Attribute"},{"name":"AttributeValue"},{"name":"SavedPayment"},{"name":"PaymentDetail"},{"name":"Transaction"},{"name":"TransactionDetail"},{"name":"FinancialAccount"},{"name":"ScheduledTransaction"},{"name":"BinaryFile"}]},{"kind":"INTERFACE","name":"MutationResponse","possibleTypes":[{"name":"PhoneNumberMutationResponse"},{"name":"DeviceRegistrationMutationResponse"},{"name":"AttributeValueMutationResponse"},{"name":"OrderMutationResponse"},{"name":"CompleteOrderMutationResponse"},{"name":"ValidateMutationResponse"},{"name":"SavePaymentMutationResponse"},{"name":"ScheduledTransactionMutationResponse"},{"name":"StatementMutationResponse"},{"name":"GroupsMutationResponse"},{"name":"LikesMutationResponse"}]}]}}'),
  }),
  cacheRedirects: {
    Query: {
      node: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'Content', id }),
    },
  },
});

export default cache;
