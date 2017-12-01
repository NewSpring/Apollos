import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
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

  get formValues() {
    const firstFund = this.firstFundInput.value;
    const secondFund = this.secondFundInput.value;
    const frequency = this.frequencyInput.value;
    const startDate = this.startDateInput.value;
    return {
      firstContributionAmount: firstFund,
      secondContributionAmount: secondFund,
      frequencyId: frequency.frequencyId,
      startDate: startDate.date,
    };
  }

  handleOnPress = () => {
    this.props.onSubmit(this.formValues);
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
        />
        <FundInput
          funds={this.props.funds}
          ref={(r) => { this.secondFundInput = r; }}
        />
        <FrequencyInput
          ref={(r) => { this.frequencyInput = r; }}
        />
        <DateInput
          ref={(r) => { this.startDateInput = r; }}
        />

        <TouchableHighlight onPress={this.handleOnPress}>
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
    ...props,
    funds: props.accounts,
    isLoading: props.isLoading,
  })),
);

export default enhance(ContributionForm);
