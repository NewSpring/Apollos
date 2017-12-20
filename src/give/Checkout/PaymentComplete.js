import PropTypes from 'prop-types';
import { compose, withProps, setPropTypes, defaultProps, branch, renderComponent } from 'recompose';
import get from 'lodash/get';
import withGive from '@data/withGive';
import ActivityIndicator from '@ui/ActivityIndicator';

import Success from './Success';
import Failure from './Failure';

const PaymentComplete = compose(
  setPropTypes({
    isLoading: PropTypes.bool,
    paymentFailed: PropTypes.bool,
    paymentFailedMessage: PropTypes.string,
    paymentSuccessful: PropTypes.bool,
  }),
  defaultProps({
    isLoading: true,
    paymentFailed: false,
    paymentFailedMessage: '',
    paymentSuccessful: false,
  }),
  withGive,
  withProps(props => ({
    ...get(props, 'contributions') || {},
  })),
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
  branch(
    ({ paymentFailed, paymentSuccessful }) => paymentFailed || !paymentSuccessful,
    renderComponent(Failure),
  ),
)(Success);

export default PaymentComplete;
