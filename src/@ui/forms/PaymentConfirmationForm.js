import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';

import { withRouter } from '@ui/NativeWebRouter';
import withGive from '@data/withGive';
import withCheckout from '@data/withCheckout';
import ActivityIndicator from '@ui/ActivityIndicator';

export class PaymentConfirmationFormWithoutData extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    campus: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    contributions: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      amount: PropTypes.number,
    })),
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    isLoading: true,
    campus: '',
    contributions: [],
    onSubmit() {},
  };

  get total() {
    return this.props.contributions
      .reduce((runningTotal, c) => (runningTotal + c.amount), 0);
  }

  render() {
    if (this.props.isLoading) return <ActivityIndicator />;

    return (
      <View>
        <Text>{'Review Contribution'}</Text>
        <Text>{`Campus: ${this.props.campus}`}</Text>

        {this.props.contributions.map(contribution => (
          <Text key={contribution.name}>{`${contribution.name} - ${contribution.amount}`}</Text>
        ))}

        <Text>{this.total}</Text>

        <TouchableHighlight
          onPress={this.props.onSubmit}
        >
          <View style={{ padding: 10 }}>
            <Text>{'Next'}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const PaymentConfirmationForm = compose(
  withGive,
  withRouter,
  withProps(props => ({
    contributions: get(props, 'contributions.contributions', []),
    campusId: get(props, 'contributions.campusId'),
  })),
  withCheckout,
  withProps((props) => {
    const campus = props.campuses && props.campuses
      .find(c => (c.id === props.campusId));

    return ({
      campus: campus && campus.label,
      ...props,
    });
  }),
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
        if (props.navigateToOnComplete) props.history.replace(props.navigateToOnComplete);
      }
    },
  })),
)(PaymentConfirmationFormWithoutData);

export default PaymentConfirmationForm;
