import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import Picker from '@primitives/Picker';
import ActivityIndicator from '@primitives/ActivityIndicator';
import withFinancialAccounts from '@data/withFinancialAccounts';

export class ContributionForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    funds: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })),
  };

  static defaultProps = {
    funds: [],
    isLoading: true,
  };

  state = {
    targetFundId: null,
    contributionAmount: 0,
  };

  get contributionAmount() {
    // eslint-disable-next-line
    return parseFloat(this.state.contributionAmount.match(/[\d\.]+/));
  }

  get targetFund() {
    return this.state.targetFund;
  }

  setContributionAmount = (value) => {
    const contributionAmount = value.replace(/[^0-9.]/g, '');

    this.setState({
      contributionAmount,
    });
  }

  setTargetFund = (targetFundId) => {
    this.setState({ targetFundId });
  }

  render() {
    if (this.props.isLoading) return <ActivityIndicator />;
    if (this.props.funds.length === 0) return <Text>{'There are no funds to contribute to!'}</Text>;
    return (
      <View>
        <Text>{'I\'d like to give'}</Text>
        <Text>{'I\'d like to give'}</Text>
        <TextInput
          placeholder="0.00"
          onChangeText={this.setContributionAmount}
          value={this.state.contributionAmount}
        />
        <Text>{'to'}</Text>
        <Picker
          onValueChange={this.setTargetFund}
          selectedValue={this.state.targetFundId}
        >
          {this.props.funds.map(({ name, id }) => (
            <Picker.Item label={name} value={id} />
          ))}
        </Picker>
      </View>
    );
  }
}

const enhance = compose(
  withFinancialAccounts,
  mapProps(props => ({
    ...props,
    funds: props.accounts,
    isLoading: props.isLoading,
  })),
);

export default enhance(ContributionForm);
