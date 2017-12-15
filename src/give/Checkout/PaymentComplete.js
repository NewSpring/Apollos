import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import get from 'lodash/get';
import withGive from '@data/withGive';
import ActivityIndicator from '@ui/ActivityIndicator';

export class PaymentComplete extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    paymentDidFail: PropTypes.bool,
    paymentDidFailMessage: PropTypes.string,
    paymentDidSucceed: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: true,
    paymentDidFail: false,
    paymentDidFailMessage: '',
    paymentDidSucceed: false,
  };

  render() {
    if (this.props.isLoading) return <ActivityIndicator />;

    if (this.props.paymentDidFail) {
      return (
        <View>
          <Text>{this.props.paymentDidFailMessage}</Text>
        </View>
      );
    }
    if (this.props.paymentDidSucceed) {
      return (
        <View>
          <Text>{'Yay!'}</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>{'Awaiting Payment'}</Text>
      </View>
    );
  }
}

const enhance = compose(
  withGive,
  mapProps(props => ({
    paymentDidFail: get(props, 'contributions.paymentFailed'),
    paymentDidFailMessage: get(props, 'contributions.paymentFailedMessage'),
    paymentDidSucceed: get(props, 'contributions.paymentSuccessful'),
    ...props,
  })),
);

export default enhance(PaymentComplete);
