import PropTypes from 'prop-types';
import { compose, withProps, setPropTypes, defaultProps, branch, renderComponent } from 'recompose';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import withGive from '@data/withGive';
import ActivityIndicator from '@ui/ActivityIndicator';
import { withRouter } from '@ui/NativeWebRouter';
import { parse } from '@utils/queryString';

import Success from './Success';
import Failure from './Failure';

// TODO: This can be improved
// by adding isRestoring logic
// similar to withRestoredGive
const withRouterGiveResult = compose(
  withRouter,
  withProps((props) => {
    const hasQueryParams = !isEmpty(get(props, 'location.search', ''));
    const { error, success: _success } = parse(get(props, 'location.search') || {}) || {};
    const success = _success && JSON.parse(_success);

    if (hasQueryParams) {
      props.setPaymentResult({
        success,
        error,
      });
    }

    return ({
      paymentFailed: props.paymentFailed || !isEmpty(error),
      paymentFailedMessage: props.paymentFailedMessage || error,
      paymentSuccessful: props.paymentSuccessful || success,
    });
  }),
);

const PaymentComplete = compose(
  withGive,
  withProps(props => ({
    ...get(props, 'contributions') || {},
  })),
  withRouterGiveResult,
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
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
  branch(
    ({ paymentFailed, paymentSuccessful }) => paymentFailed || !paymentSuccessful,
    renderComponent(Failure),
  ),
)(Success);

export default PaymentComplete;
