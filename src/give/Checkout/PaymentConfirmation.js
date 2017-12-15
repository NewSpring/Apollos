import { compose, withProps } from 'recompose';
import { get } from 'lodash';
import withGive from '@data/withGive';
import { PaymentConfirmationForm } from '@ui/forms';
import { withRouter } from '@ui/NativeWebRouter';

const PaymentConfirmation = compose(
  withGive,
  withRouter,
  withProps(props => ({
    onSubmit: async () => {
      try {
        props.isPaying(true);
        const payment = await props.postPayment();
        if (props.contributions.paymentMethod === 'creditCard') {
          const validateCardRes = await props.validateSingleCardTransaction(
            props.contributions.orderPaymentToken,
          );
          const invalidCardError = get(validateCardRes, 'data.response.error');
          if (invalidCardError) throw new Error(invalidCardError);
        }

        // NOTE: Need to keep reading through
        // the code to understand what id and name are for
        const completeOrderRes = await props.completeOrder(props.contributions.orderPaymentToken);
        const unableToCompleteOrderError = get(completeOrderRes, 'data.response.error');
        if (unableToCompleteOrderError) throw new Error(unableToCompleteOrderError);

        props.setPaymentResult({
          success: true,
        });
        return payment;
      } catch (err) {
        props.setPaymentResult({
          error: err.message,
        });
        return null;
      } finally {
        props.isPaying(false);
        props.history.replace('complete');
      }
    },
  })),
)(PaymentConfirmationForm);

export default PaymentConfirmation;
