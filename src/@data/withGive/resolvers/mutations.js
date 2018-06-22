import pick from 'lodash/pick';
import { QUERY as contributionsQuery } from '@data/withGive/withContributions';
import sentry from '@utils/sentry';
import { INITIAL_STATE } from './queries';

export function addContribution(result, variables, { cache }) {
  const { contributions: state } = cache.readQuery({
    query: contributionsQuery,
  });

  cache.writeQuery({
    query: contributionsQuery,
    data: {
      contributions: {
        ...state,
        contributions: [
          ...state.contributions,
          {
            ...pick(variables, ['id', 'amount', 'name']),
            __typename: 'GiveContribution',
          },
        ],
      },
    },
  });
  return null;
}

export function resetContributions(result, variables, { cache }) {
  cache.writeQuery({
    query: contributionsQuery,
    data: {
      contributions: {
        ...INITIAL_STATE,
      },
    },
  });
  return null;
}

export function setContributionFrequency(result, variables, { cache }) {
  const { contributions: state } = cache.readQuery({
    query: contributionsQuery,
  });

  cache.writeQuery({
    query: contributionsQuery,
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
  });

  cache.writeQuery({
    query: contributionsQuery,
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
  });

  cache.writeQuery({
    query: contributionsQuery,
    data: {
      contributions: {
        ...state,
        ...pick(variables, ['firstName', 'lastName', 'email', 'campusId']),
      },
    },
  });

  return null;
}

export function setBillingAddress(result, variables, { cache }) {
  const { contributions: state } = cache.readQuery({
    query: contributionsQuery,
  });

  cache.writeQuery({
    query: contributionsQuery,
    data: {
      contributions: {
        ...state,
        ...pick(variables, ['street1', 'street2', 'countryId', 'city', 'stateId', 'zipCode']),
      },
    },
  });

  return null;
}

export function setCreditCard(result, variables, { cache }) {
  const { contributions: state } = cache.readQuery({
    query: contributionsQuery,
  });

  cache.writeQuery({
    query: contributionsQuery,
    data: {
      contributions: {
        ...state,
        creditCard: {
          ...state.creditCard,
          cardNumber: variables.cardNumber,
          expirationDate: variables.expirationDate,
          cvv: variables.cvv,
        },
      },
    },
  });
  return null;
}

export function setBankAccount(result, variables, { cache }) {
  const { contributions: state } = cache.readQuery({
    query: contributionsQuery,
  });

  cache.writeQuery({
    query: contributionsQuery,
    data: {
      contributions: {
        ...state,
        bankAccount: {
          ...state.bankAccount,
          accountNumber: variables.accountNumber,
          routingNumber: variables.routingNumber,
          accountName: variables.accountName,
          accountType: variables.accountType,
        },
      },
    },
  });
  return null;
}

export function setPaymentMethod(result, variables, { cache }) {
  const { contributions: state } = cache.readQuery({
    query: contributionsQuery,
  });

  cache.writeQuery({
    query: contributionsQuery,
    data: {
      contributions: {
        ...state,
        paymentMethod: variables.method,
      },
    },
  });
  return null;
}

export async function postPayment(result, variables, { cache }) {
  try {
    if (!variables.url) throw new Error('url is required!');
    const { contributions: state } = cache.readQuery({
      query: contributionsQuery,
    });

    let formData = new FormData();
    switch (state.paymentMethod) {
      case 'bankAccount':
        formData.append('billing-account-number', state.bankAccount.accountNumber);
        formData.append('billing-routing-number', state.bankAccount.routingNumber);
        formData.append('billing-account-name', state.bankAccount.accountName);
        formData.append('billing-account-type', state.bankAccount.accountType);
        formData.append('billing-entity-type', 'personal');
        break;
      case 'creditCard':
        formData.append('billing-cc-number', state.creditCard.cardNumber);
        formData.append('billing-cc-exp', state.creditCard.expirationDate);
        formData.append('billing-cvv', state.creditCard.cvv);
        break;
      default:
        formData = null;
        break;
    }

    await fetch(variables.url, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    });

    return null;
  } catch (err) {
    throw err;
  }
}

export async function setPaymentResult(result, variables, { cache }) {
  try {
    const { contributions: state } = cache.readQuery({
      query: contributionsQuery,
    });
    const paymentSuccessful = !!variables.success;
    if (paymentSuccessful) {
      cache.writeQuery({
        query: contributionsQuery,
        data: {
          contributions: {
            ...INITIAL_STATE,
            paymentFailed: false,
            paymentFailedMessage: '',
            paymentSuccessful,
          },
        },
      });
      return null;
    }

    cache.writeQuery({
      query: contributionsQuery,
      data: {
        contributions: {
          ...state,
          paymentFailed: !!variables.error,
          paymentFailedMessage: variables.error || '',
          paymentSuccessful: false,
        },
      },
    });

    return null;
  } catch (err) {
    throw err;
  }
}

export async function isPaying(result, variables, { cache }) {
  try {
    const { contributions: state } = cache.readQuery({
      query: contributionsQuery,
    });

    cache.writeQuery({
      query: contributionsQuery,
      data: {
        contributions: {
          ...state,
          isPaying: variables.isPaying,
        },
      },
    });

    return null;
  } catch (err) {
    throw err;
  }
}

export async function isSavingPaymentMethod(result, variables, { cache }) {
  try {
    const { contributions: state } = cache.readQuery({
      query: contributionsQuery,
    });

    cache.writeQuery({
      query: contributionsQuery,
      data: {
        contributions: {
          ...state,
          isSavingPaymentMethod: variables.isSavingPaymentMethod,
        },
      },
    });

    return null;
  } catch (err) {
    throw err;
  }
}

export async function willSavePaymentMethod(result, variables, { cache }) {
  try {
    const { contributions: state } = cache.readQuery({
      query: contributionsQuery,
    });

    cache.writeQuery({
      query: contributionsQuery,
      data: {
        contributions: {
          ...state,
          willSavePaymentMethod: variables.willSavePaymentMethod,
        },
      },
    });

    return null;
  } catch (err) {
    throw err;
  }
}

export async function setSavedPaymentName(result, variables, { cache }) {
  try {
    const { contributions: state } = cache.readQuery({
      query: contributionsQuery,
    });

    cache.writeQuery({
      query: contributionsQuery,
      data: {
        contributions: {
          ...state,
          savedAccountName: variables.name,
        },
      },
    });

    return null;
  } catch (err) {
    throw err;
  }
}

export async function setSavedPaymentMethod(result, variables, { cache }) {
  try {
    const { contributions: state } = cache.readQuery({
      query: contributionsQuery,
    });

    cache.writeQuery({
      query: contributionsQuery,
      data: {
        contributions: {
          ...state,
          paymentMethod: 'savedPaymentMethod',
          creditCard: { ...INITIAL_STATE.creditCard },
          bankAccount: { ...INITIAL_STATE.bankAccount },
          willSavePaymentMethod: false,
          savedAccountName: '',
          savedPaymentMethodId: variables.id,
        },
      },
    });

    return null;
  } catch (err) {
    throw err;
  }
}

export function restoreContributions(result, variables, { cache }) {
  let stateVariables = {};
  try {
    stateVariables = JSON.parse(variables.state);
  } catch (e) {
    sentry.captureException(e, {
      extra: { stateVariables: variables.state },
    });
  }

  cache.writeQuery({
    query: contributionsQuery,
    data: {
      contributions: stateVariables,
    },
  });
  return null;
}
