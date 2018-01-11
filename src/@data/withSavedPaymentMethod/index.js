import { compose } from 'recompose';
import withEditSavedPaymentMethod from './withEditSavedPaymentMethod';
import withRemoveSavedPaymentMethod from './withRemoveSavedPaymentMethod';
import withSavedPaymentMethod from './withSavedPaymentMethod';

export default compose(
  withEditSavedPaymentMethod,
  withRemoveSavedPaymentMethod,
  withSavedPaymentMethod,
);
