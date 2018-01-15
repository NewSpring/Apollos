export const INITIAL_STATE = {
  // Create Order Forms
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
  isLoadingOrderUrl: false,
  orderPaymentUrl: '',
  orderPaymentToken: '',
  creditCard: {
    __typename: 'CreditCard',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  },
  bankAccount: {
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
  willSavePaymentMethod: true,
  savedAccountName: '',
  savedPaymentMethodId: '',
};

export function contributions() {
  return INITIAL_STATE;
}

