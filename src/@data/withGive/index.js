import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import Client from '@data/Client';
import addContributionMutation from './addContributionMutation';
import resetContributionsMutation from './resetContributionsMutation';
import setContributionFrequencyMutation from './setContributionFrequencyMutation';
import setContributionStartDateMutation from './setContributionStartDateMutation';
import setBillingPersonMutation from './setBillingPersonMutation';
import setBillingAddressMutation from './setBillingAddressMutation';
import contributionsQuery from './contributionsQuery';
import selectOrderDetails from './selectOrderDetails';
import createOrderMutation from './createOrderMutation';
import setOrderMutation from './setOrderMutation';
import setCreditCardMutation from './setCreditCardMutation';
import setBankAccountMutation from './setBankAccountMutation';
import setPaymentMethodMutation from './setPaymentMethodMutation';
import postPaymentMutation from './postPaymentMutation';

const addContribution = graphql(addContributionMutation, {
  props: ({ mutate }) => ({
    addContribution: variables => (mutate({ variables })),
  }),
});

const resetContributions = graphql(resetContributionsMutation, {
  props: ({ mutate }) => ({
    resetContributions: variables => (mutate({ variables })),
  }),
});

const setContributionFrequency = graphql(setContributionFrequencyMutation, {
  props: ({ mutate }) => ({
    setContributionFrequency: id => (mutate({
      variables: {
        id,
      },
    })),
  }),
});

const setContributionStartDate = graphql(setContributionStartDateMutation, {
  props: ({ mutate }) => ({
    setContributionStartDate: startDate => (mutate({
      variables: {
        startDate: startDate.toJSON(),
      },
    })),
  }),
});

const setBillingPerson = graphql(setBillingPersonMutation, {
  props: ({ mutate }) => ({
    setBillingPerson: props => (mutate({
      variables: {
        firstName: props.firstName,
        lastName: props.lastName,
        email: props.email,
        campusId: props.campusId,
      },
    })),
  }),
});

const setBillingAddress = graphql(setBillingAddressMutation, {
  props: ({ mutate }) => ({
    setBillingAddress: props => (mutate({
      variables: {
        street1: props.street1,
        street2: props.street2,
        countryId: props.countryId,
        city: props.city,
        stateId: props.stateId,
        zipCode: props.zipCode,
      },
    })),
  }),
});

// NOTE: They create order after capturing a billing address
// Works kind of like a thunk
const createOrder = graphql(createOrderMutation, {
  props: ({ mutate }) => ({
    createOrder() {
      const { contributions: state } = Client.readQuery({
        query: contributionsQuery,
      });
      const orderDetails = selectOrderDetails(state);
      Client.writeQuery({
        query: contributionsQuery,
        data: {
          contributions: {
            ...state,
            isLoadingOrderUrl: true,
          },
        },
      });

      return mutate({
        variables: {
          data: JSON.stringify(orderDetails),
          id: null,
          instant: false,
        },
      });
    },
  }),
});

// NOTE: Payment info is sent to the URL
const setOrder = graphql(setOrderMutation, {
  props: ({ mutate }) => ({
    setOrder: props => (mutate({
      variables: {
        url: props.url,
      },
    })),
  }),
});

const setCreditCard = graphql(setCreditCardMutation, {
  props: ({ mutate }) => ({
    setCreditCard: props => (mutate({
      variables: {
        cardNumber: props.cardNumber,
        expirationDate: props.expirationDate,
        cvv: props.cvv,
      },
    })),
  }),
});

const setBankAccount = graphql(setBankAccountMutation, {
  props: ({ mutate }) => ({
    setBankAccount: props => (mutate({
      variables: {
        accountNumber: props.accountNumber,
        routingNumber: props.routingNumber,
        accountName: props.accountName,
        accountType: props.accountType,
      },
    })),
  }),
});

const setPaymentMethod = graphql(setPaymentMethodMutation, {
  props: ({ mutate }) => ({
    isPayingWithCreditCard: () => (mutate({
      variables: {
        method: 'creditCard',
      },
    })),
    isPayingWithBankAccount: () => (mutate({
      variables: {
        method: 'bankAccount',
      },
    })),
  }),
});

const postPayment = graphql(postPaymentMutation, {
  props: ({ mutate }) => ({
    postPayment: () => {
      const { contributions: state } = Client.readQuery({
        query: contributionsQuery,
      });
      Client.writeQuery({
        query: contributionsQuery,
        data: {
          contributions: {
            ...state,
            isPostingPayment: true,
          },
        },
      });

      return mutate();
    },
  }),
});

const get = graphql(contributionsQuery, {
  props({ data: { contributions, loading } }) {
    if (!contributions) return { contributions, isLoading: loading };
    return {
      isLoading: loading,
      contributions: {
        ...contributions,
        startDate: contributions && new Date(contributions.startDate),
      },
    };
  },
});

export default compose(
  addContribution,
  resetContributions,
  setContributionFrequency,
  setContributionStartDate,
  setBillingPerson,
  setBillingAddress,
  createOrder,
  setOrder,
  setCreditCard,
  setBankAccount,
  setPaymentMethod,
  postPayment,
  get,
);
