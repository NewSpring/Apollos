import pick from 'lodash/pick';
import contributionsQuery from './contributionsQuery';

export function addContribution(result, variables, { cache }) {
  const { contributions: state } = cache.readQuery({
    query: contributionsQuery,
    variables,
  });

  cache.writeQuery({
    query: contributionsQuery,
    variables,
    data: {
      contributions: {
        ...state,
        contributions: [
          ...state.contributions,
          pick(variables, ['id', 'amount', 'name']),
        ],
      },
    },
  });
  return null;
}

export function resetContributions(result, variables, { cache }) {
  const { contributions: state } = cache.readQuery({
    query: contributionsQuery,
    variables,
  });

  cache.writeQuery({
    query: contributionsQuery,
    variables,
    data: {
      contributions: {
        ...state,
        contributions: [],
      },
    },
  });
  return null;
}

export function setContributionFrequency(result, variables, { cache }) {
  const { contributions: state } = cache.readQuery({
    query: contributionsQuery,
    variables,
  });

  cache.writeQuery({
    query: contributionsQuery,
    variables,
    data: {
      contributions: {
        ...state,
        frequencyId: variables.id,
      },
    },
  });
  return null;
}

export function setContributionStartDate(result, variables, { cache }) {
  const { contributions: state } = cache.readQuery({
    query: contributionsQuery,
    variables,
  });

  cache.writeQuery({
    query: contributionsQuery,
    variables,
    data: {
      contributions: {
        ...state,
        startDate: variables.startDate,
      },
    },
  });
  return null;
}

export function setBillingPerson(result, variables, { cache }) {
  const { contributions: state } = cache.readQuery({
    query: contributionsQuery,
    variables,
  });

  cache.writeQuery({
    query: contributionsQuery,
    variables,
    data: {
      contributions: {
        ...state,
        ...pick(variables, [
          'firstName',
          'lastName',
          'email',
          'campusId',
        ]),
      },
    },
  });

  return null;
}

export function setBillingAddress(result, variables, { cache }) {
  const { contributions: state } = cache.readQuery({
    query: contributionsQuery,
    variables,
  });

  cache.writeQuery({
    query: contributionsQuery,
    variables,
    data: {
      contributions: {
        ...state,
        ...pick(variables, [
          'street1',
          'street2',
          'countryId',
          'city',
          'stateId',
          'zipCode',
        ]),
      },
    },
  });

  return null;
}
