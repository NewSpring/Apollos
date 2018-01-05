import { compose } from 'recompose';
import addContribution from './addContribution';
import resetContributions from './resetContributions';
import setContributionFrequency from './setContributionFrequency';
import setContributionStartDate from './setContributionStartDate';
import setBillingPerson from './setBillingPerson';
import setBillingAddress from './setBillingAddress';
import withContributions from './withContributions';
import createOrder from './createOrder';
import setOrder from './setOrder';
import setCreditCard from './setCreditCard';
import setBankAccount from './setBankAccount';
import setPaymentMethod from './setPaymentMethod';
import postPayment from './postPayment';
import completeOrder from './completeOrder';
import setPaymentResult from './setPaymentResult';
import setIsPaying from './setIsPaying';
import validateSingleCardTransaction from './validateSingleCardTransaction';
import savePaymentMethod from './savePaymentMethod';
import setIsSavingPaymentMethod from './setIsSavingPaymentMethod';
import setWillSavePaymentMethod from './setWillSavePaymentMethod';
import setSavedPaymentName from './setSavedPaymentName';

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
  withContributions,
  savePaymentMethod,
  setIsSavingPaymentMethod,
  setWillSavePaymentMethod,
  setSavedPaymentName,
);
