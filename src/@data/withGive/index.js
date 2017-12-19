import { graphql } from 'react-apollo';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';
import Client from '@data/Client';
import addContributionMutation from './addContributionMutation';
import resetContributionsMutation from './resetContributionsMutation';
import setContributionFrequencyMutation from './setContributionFrequencyMutation';
import setContributionStartDateMutation from './setContributionStartDateMutation';
import setBillingPersonMutation from './setBillingPersonMutation';
import setBillingAddressMutation from './setBillingAddressMutation';
import contributionsQuery from './contributionsQuery';
import getOrderDetails from './selectors/getOrderDetails';
import createOrderMutation from './createOrderMutation';
import setOrderMutation from './setOrderMutation';
import setCreditCardMutation from './setCreditCardMutation';
import setBankAccountMutation from './setBankAccountMutation';
import setPaymentMethodMutation from './setPaymentMethodMutation';
import postPaymentMutation from './postPaymentMutation';
import validateCardMutation from './validateCardMutation';
import completeOrderMutation from './completeOrderMutation';
import setPaymentResultMutation from './setPaymentResultMutation';
import isPayingMutation from './isPayingMutation';

const addContribution = graphql(addContributionMutation, {
  props: ({ mutate }) => ({
    addContribution: variables => (mutate({ variables })),
  }),
});

const resetContributions = graphql(resetContributionsMutation, {
  props: ({ mutate }) => ({
    resetContributions: () => (mutate()),
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
      const orderDetails = getOrderDetails(state);
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

const setIsPaying = graphql(isPayingMutation, {
  props: ({ mutate }) => ({
    isPaying: isPaying => (mutate({
      variables: {
        isPaying,
      },
    })),
  }),
});

const postPayment = graphql(postPaymentMutation, {
  props: ({ mutate }) => ({
    postPayment: () => (mutate()),
  }),
});

// For non-saved CC only START
const validateCard = graphql(validateCardMutation, {
  props: ({ mutate }) => ({
    validateSingleCardTransaction: token => (mutate({
      variables: {
        token,
      },
    })),
  }),
});

const createValidationOrder = graphql(createOrderMutation, {
  props: ({ mutate }) => ({
    createValidationOrder() {
      const { contributions: state } = Client.readQuery({
        query: contributionsQuery,
      });
      const orderDetails = getOrderDetails(state);
      orderDetails.amount = 0;

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

const validateSingleCardTransaction = compose(
  createValidationOrder,
  validateCard,
  withProps(props => ({
    async validateSingleCardTransaction() {
      try {
        const { contributions: state } = Client.readQuery({
          query: contributionsQuery,
        });

        const r = await props.createValidationOrder();
        const order = get(r, 'data.order', {});

        const formData = new FormData();
        formData.append('billing-cc-number', state.creditCard.cardNumber);
        formData.append('billing-cc-exp', state.creditCard.expirationDate);
        formData.append('billing-cvv', state.creditCard.cvv);

        await fetch(order.url, {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        });

        const token = order.url.split('/').pop();
        const validationRes = await props.validateSingleCardTransaction(token);
        const invalidCardError = get(validationRes, 'data.response.error');
        if (invalidCardError) throw new Error(invalidCardError);

        return true;
      } catch (err) {
        throw err;
      }
    },
  })),
);
// For non-saved CC only END

const completeOrder = graphql(completeOrderMutation, {
  props: ({ mutate }) => ({
    completeOrder: token => (mutate({
      variables: {
        token,
      },
    })),
  }),
});

const setPaymentResult = graphql(setPaymentResultMutation, {
  props: ({ mutate }) => ({
    setPaymentResult: props => (mutate({
      variables: {
        error: props.error,
        success: props.success,
      },
    })),
  }),
});

const getGive = graphql(contributionsQuery, {
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
  validateSingleCardTransaction,
  completeOrder,
  setPaymentResult,
  setIsPaying,
  getGive,
);
