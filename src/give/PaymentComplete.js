import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import withGive from '@data/withGive';
import ActivityIndicator from '@ui/ActivityIndicator';

export class PaymentComplete extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    onValidatePayment: PropTypes.func,
  };

  static defaultProps = {
    isLoading: true,
    onValidatePayment() {},
  };

  render() {
    if (this.props.isLoading) return <ActivityIndicator />;
    return (
      <View>
        <TouchableHighlight
          onPress={this.props.onValidatePayment}
        >
          <View style={{ padding: 10 }}>
            <Text>{'Check Payment'}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const enhance = compose(
  withGive,
  mapProps(props => ({
    onValidatePayment() {
      console.log(props);
      // props.validatePayment(props.contributions.orderPaymentToken);
    },
    ...props,
  })),
);

export default enhance(PaymentComplete);
