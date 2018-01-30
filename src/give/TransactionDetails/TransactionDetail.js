import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { H3 } from '@ui/typography';
import CashAmountIndicator from '@ui/CashAmountIndicator';

export default class TransactionDetail extends PureComponent {
  static propTypes = {
    fundName: PropTypes.string,
    amount: PropTypes.number,
  };

  static defaultProps = {
    fundName: '',
    amount: 0,
  };

  render() {
    return (
      <View>
        <H3>{this.props.fundName}</H3>
        <CashAmountIndicator
          amount={this.props.amount}
        />
      </View>
    );
  }
}
