import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import get from 'lodash/get';
import ActivityIndicator from '@primitives/ActivityIndicator';
import { H3, BodyCopy as P } from '@primitives/typography';
import withFinancialAccounts from '@data/withFinancialAccounts';
import FundInput from './FundInput';
import FrequencyInput from './FrequencyInput';
import DateInput from './DateInput';

export class ContributionForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    isOffline: PropTypes.bool,
    funds: FundInput.propTypes.funds,
    offlineContactEmail: PropTypes.string,
    offlineMessageBody: PropTypes.string,
    offlineMessageTitle: PropTypes.string,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    funds: [],
    isLoading: true,
    isOffline: false,
    offlineContactEmail: '',
    offlineMessageTitle: 'Unfortunately our giving service is offline.',
    offlineMessageBody: 'We are working to resolve this as fast as possible. We are sorry for any inconvience this may have caused.',
    onSubmit() {},
  };

  state = {
    secondFundVisible: false,
    recurringPaymentOptionsVisible: false,
    reviewContributionButtonEnabled: false,
  };

  get value() {
    const firstFund = get(this.firstFundInput, 'value', {});
    const secondFund = get(this.secondFundInput, 'value', {});
    const frequencyId = get(this.frequencyInput, 'value.frequencyId', 'today');
    const startDate = get(this.startDateInput, 'value.date', new Date());
    return {
      firstContribution: firstFund,
      secondContribution: secondFund,
      frequencyId,
      startDate,
    };
  }

  get totalContribution() {
    const firstContribution = get(this.firstFundInput, 'value.amount', 0);
    const secondContribution = get(this.secondFundInput, 'value.amount', 0);
    return firstContribution + secondContribution;
  }

  get remainingFunds() {
    const firstFundId = get(this.firstFundInput, 'value.id');
    const isNotFirstFund = fund => fund.id !== firstFundId;
    return this.props.funds.filter(isNotFirstFund);
  }

  handleSubmit = () => {
    this.props.onSubmit(this.value);
  }

  handleToggleSecondFund = () => {
    this.setState({
      secondFundVisible: !this.state.secondFundVisible,
    });
  }

  handleToggleRecurringPaymentOptionsVisibility = () => {
    this.setState({
      recurringPaymentOptionsVisible: !this.state.recurringPaymentOptionsVisible,
    });
  }

  handleChangeFundInput = () => {
    this.setState({
      reviewContributionButtonEnabled: this.totalContribution > 0,
    });
  }

  renderOfflineMessage() {
    return (
      <View>
        <H3>{this.props.offlineMessageTitle}</H3>
        <P>{this.props.offlineMessageBody}</P>
        <P>{`We appreciate your patience. If you have any questions please contact us at ${this.props.offlineContactEmail}`}</P>
      </View>
    );
  }

  render() {
    if (this.props.isLoading) return <ActivityIndicator />;
    if (this.props.funds.length === 0) return <Text>{'There are no funds to contribute to!'}</Text>;
    if (this.props.isOffline) return this.renderOfflineMessage();

    return (
      <View>
        <FundInput
          funds={this.props.funds}
          isFirst
          ref={(r) => { this.firstFundInput = r; }}
          onChange={this.handleChangeFundInput}
        />
        {this.state.secondFundVisible &&
          <FundInput
            funds={this.remainingFunds}
            ref={(r) => { this.secondFundInput = r; }}
            onChange={this.handleChangeFundInput}
          />
        }

        <TouchableHighlight onPress={this.handleToggleSecondFund}>
          <View style={{ padding: 10 }}>
            <Text>{this.state.secondFundVisible ? 'Remove Fund' : 'Add Another Fund'}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.handleToggleRecurringPaymentOptionsVisibility}>
          <View style={{ padding: 10 }}>
            <Text>{this.state.recurringPaymentOptionsVisible ? '[x] Schedule Contribution' : '[ ] Schedule Contribution'}</Text>
          </View>
        </TouchableHighlight>

        {this.state.recurringPaymentOptionsVisible &&
          <View>
            <FrequencyInput
              ref={(r) => { this.frequencyInput = r; }}
            />
            <DateInput
              ref={(r) => { this.startDateInput = r; }}
            />
          </View>
        }

        <Text>{`my total is ${this.totalContribution}`}</Text>

        <TouchableHighlight
          onPress={this.state.reviewContributionButtonEnabled ? this.handleSubmit : null}
        >
          <View style={{ padding: 10 }}>
            <Text>{'Review Contribution'}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const enhance = compose(
  withFinancialAccounts,
  mapProps(props => ({
    funds: props.accounts,
    isLoading: props.isLoading,
    ...props,
  })),
);

export default enhance(ContributionForm);
