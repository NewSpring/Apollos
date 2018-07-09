export const INITIAL_STATE = {
  // Create Order Forms
  id: 'GiveContributions',
  __typename: 'GiveContributions',
  contributions: [],
  frequencyId: 'today',
  startDate: (new Date()).toJSON(),
  firstName: '',
  lastName: '',
  email: '',
  campusId: '',
  street1: '',
  street2: '',
  countryId: 'US',
  city: '',
  stateId: 'SC',
  zipCode: '',

  // Make payment
  creditCard: {
    id: 'CreditCard',
    __typename: 'CreditCard',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  },
  bankAccount: {
    id: 'BankAccount',
    __typename: 'BankAccount',
    accountNumber: '',
    routingNumber: '',
    accountName: '',
    accountType: 'checking',
  },
  paymentMethod: 'creditCard', // creditCard, bankAccount, savedPaymentMethod
  isPaying: false,
  paymentFailed: false,
  paymentFailedMessage: '',
  paymentSuccessful: false,
  isSavingPaymentMethod: false,
  willSavePaymentMethod: false,
  savedAccountName: '',
  savedPaymentMethodId: null,
};

export function contributions() {
  return INITIAL_STATE;
}

