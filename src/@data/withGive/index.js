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
import formatPersonDetails from './formatPersonDetails';
import createOrderMutation from './createOrderMutation';

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
const createOrder = graphql(createOrderMutation, {
  props: ({ mutate }) => ({
    createOrder() {
      const { contributions: state } = Client.readQuery({
        query: contributionsQuery,
      });
      formatPersonDetails(state);
      // mutate({
      //   variables: {
      //     data: JSON.stringify(formatPersonDetails(state)),
      //     id: null,
      //     instant: false,
      //   },
      // });
    },
  }),
});


const get = graphql(contributionsQuery, {
  props({ data: { contributions } }) {
    if (!contributions) return { contributions };
    return {
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
  get,
);
