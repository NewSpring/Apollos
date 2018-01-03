import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

import authenticationLink from './authenticationLink';
import httpLink from './httpLink';
import clientStateLink from './clientStateLink';

export default new ApolloClient({
  link: clientStateLink.concat(
    authenticationLink.concat(httpLink),
  ),
  cache: new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      // NOTE: Introspection result goes here!
      // More Info: ./README.md
      introspectionQueryResultData: JSON.parse('{"__schema":{"types":[{"kind":"INTERFACE","name":"Node","possibleTypes":[{"name":"User"},{"name":"Content"},{"name":"Campus"},{"name":"Location"},{"name":"File"},{"name":"Navigation"},{"name":"Person"},{"name":"PhoneNumber"},{"name":"Group"},{"name":"DefinedValue"},{"name":"GroupSchedule"},{"name":"GroupMember"},{"name":"GroupLocation"},{"name":"Attribute"},{"name":"AttributeValue"},{"name":"SavedPayment"},{"name":"PaymentDetail"},{"name":"Transaction"},{"name":"TransactionDetail"},{"name":"FinancialAccount"},{"name":"ScheduledTransaction"},{"name":"BinaryFile"}]},{"kind":"INTERFACE","name":"MutationResponse","possibleTypes":[{"name":"PhoneNumberMutationResponse"},{"name":"DeviceRegistrationMutationResponse"},{"name":"AttributeValueMutationResponse"},{"name":"OrderMutationResponse"},{"name":"CompleteOrderMutationResponse"},{"name":"ValidateMutationResponse"},{"name":"SavePaymentMutationResponse"},{"name":"ScheduledTransactionMutationResponse"},{"name":"StatementMutationResponse"},{"name":"GroupsMutationResponse"},{"name":"LikesMutationResponse"}]}]}}'),
    }),
  }),
});
