import { compose, withProps } from 'recompose';
import withGive from '@data/withGive';
import { PaymentForm } from '@ui/forms';
import { withRouter } from '@ui/NativeWebRouter';

const Payment = compose(
  withGive,
  withRouter,
  withProps(props => ({
    onSelectCC: props.isPayingWithCreditCard,
    onSelectBA: props.isPayingWithBankAccount,
    onSubmitCC: (...args) => props.setCreditCard(...args) && (props.history.push('confirm')),
    onSubmitBA: (...args) => props.setBankAccount(...args) && (props.history.push('confirm')),
  })),
)(PaymentForm);

export default Payment;
