import pick from 'lodash/pick';
import { QUERY as contributionsQuery } from '@data/withGive/withContributions';

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

export function setOrder(result, variables, { cache }) {
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
        orderPaymentUrl: variables.url,
        orderPaymentToken: variables.url.split('/').pop(),
        isLoadingOrderUrl: false,
      },
    },
  });
  return null;
}

export function setCreditCard(result, variables, { cache }) {
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
    variables,
  });

  cache.writeQuery({
    query: contributionsQuery,
    variables,
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
    variables,
  });

  cache.writeQuery({
    query: contributionsQuery,
    variables,
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
    const { contributions: state } = cache.readQuery({
      query: contributionsQuery,
      variables,
    });

    const formData = new FormData();
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
        break;
    }

    await fetch(state.orderPaymentUrl, {
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
      variables,
    });

    cache.writeQuery({
      query: contributionsQuery,
      variables,
      data: {
        contributions: {
          ...state,
          paymentFailed: !!variables.error,
          paymentFailedMessage: variables.error || '',
          paymentSuccessful: !!variables.success,
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
      variables,
    });

    cache.writeQuery({
      query: contributionsQuery,
      variables,
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
      variables,
    });

    cache.writeQuery({
      query: contributionsQuery,
      variables,
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
      variables,
    });

    cache.writeQuery({
      query: contributionsQuery,
      variables,
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
      variables,
    });

    cache.writeQuery({
      query: contributionsQuery,
      variables,
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
