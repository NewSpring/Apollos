import { compose } from 'recompose';
import { withFormik } from 'formik';
import withGive from '@data/withGive';
import withCheckout from '@data/withCheckout';
import { PaymentForm } from '@ui/forms';
import { withRouter } from '@ui/NativeWebRouter';

const Payment = compose(
  withGive,
  withCheckout,
  withRouter,
  withFormik({
    mapPropsToValues: () => ({
      method: 'creditCard',
    }),
    handleSubmit: (values, { props }) => {
      const setter = values.method === 'bankAccount' ? props.setBankAccount : props.setCreditCard;
      setter(values);
      props.history.replace('confirm');
    },
  }),
)(PaymentForm);

export default Payment;
