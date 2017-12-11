import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import CreditCardForm from './CreditCardForm';
import BankAccountForm from './BankAccountForm';

export default class PaymentForm extends Component {
  static propTypes = {
    onSubmitCC: PropTypes.func,
    onSubmitBA: PropTypes.func,
  };

  static defaultProps = {
    onSubmitCC() {},
    onSubmitBA() {},
  };

  state = {
    ccFormVisible: true,
  }

  showCCForm = () => {
    this.setState({
      ccFormVisible: true,
    });
  }

  showBAForm = () => {
    this.setState({
      ccFormVisible: false,
    });
  }

  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={this.showCCForm}
        >
          <View style={{ padding: 10 }}>
            <Text>{'Credit Card'}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={this.showBAForm}
        >
          <View style={{ padding: 10 }}>
            <Text>{'Bank Account'}</Text>
          </View>
        </TouchableHighlight>

        {this.state.ccFormVisible && (
          <CreditCardForm
            onSubmit={this.props.onSubmitCC}
          />
        )}
        {!this.state.ccFormVisible && (
          <BankAccountForm
            onSubmit={this.props.onSubmitBA}
          />
        )}
      </View>
    );
  }
}
