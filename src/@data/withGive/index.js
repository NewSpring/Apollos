import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import addContributionMutation from './addContributionMutation';
import resetContributionsMutation from './resetContributionsMutation';
import setContributionFrequencyMutation from './setContributionFrequencyMutation';
import setContributionStartDateMutation from './setContributionStartDateMutation';
import setBillingPersonMutation from './setBillingPersonMutation';
import contributionsQuery from './contributionsQuery';

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
  get,
);
