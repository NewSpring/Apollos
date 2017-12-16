import React, { Component } from 'react';
import {
  View,
  Text,
  // TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ActivityIndicator from '@ui/ActivityIndicator';
import { H3, H2, BodyCopy as P } from '@ui/typography';
import Button from '@ui/Button';
import * as Inputs from '@ui/inputs';
import PaddedView from '@ui/PaddedView';

import FundInput from './FundInput';
import FrequencyInput, { FREQUENCY_IDS } from './FrequencyInput';
import DateInput from './DateInput';


const FundContributionType = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  amount: PropTypes.oneOfType([
    PropTypes.string, // will get converted to number when submitted
    PropTypes.number,
  ]),
  name: PropTypes.string,
};

export class ContributionForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    isOffline: PropTypes.bool,
    funds: FundInput.propTypes.funds,
    offlineContactEmail: PropTypes.string,
    offlineMessageBody: PropTypes.string,
    offlineMessageTitle: PropTypes.string,

    setFieldValue: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    values: PropTypes.shape({
      secondFundVisible: PropTypes.bool,
      firstContribution: PropTypes.shape(FundContributionType),
      secondContribution: PropTypes.shape(FundContributionType),
      frequencyId: PropTypes.string,
      startDate: PropTypes.object,
    }),
  };

  static defaultProps = {
    funds: [],
    isLoading: true,
    isOffline: false,
    offlineContactEmail: '',
    offlineMessageTitle: 'Unfortunately our giving service is offline.',
    offlineMessageBody: 'We are working to resolve this as fast as possible. We are sorry for any inconvience this may have caused.',
  };

  state = {
    secondFundVisible: get(this.props.values, 'secondContribution.id'),
    recurringPaymentOptionsVisible: get(this.props.values, 'frequencyId'),
  }

  get totalContribution() {
    const firstContribution = parseFloat(get(this.props.values, 'firstContribution.amount', 0));
    const secondContribution = parseFloat(get(this.props.values, 'secondContribution.amount', 0));
    return firstContribution + secondContribution;
  }

  get remainingFunds() {
    const firstFundId = get(this.props.values.firstContribution, 'id');
    const isNotFirstFund = fund => fund.id !== firstFundId;
    return this.props.funds.filter(isNotFirstFund);
  }

  handleToggleSecondFund = () => {
    const secondFundVisible = !this.state.secondFundVisible;

    this.props.setFieldValue('secondContribution', secondFundVisible ?
      this.remainingFunds[0] : null,
    );

    this.setState({ secondFundVisible });
  }

  handleToggleRecurringPaymentOptionsVisibility = () => {
    const recurringPaymentOptionsVisible = !this.state.recurringPaymentOptionsVisible;

    this.props.setFieldValue('frequencyId', FREQUENCY_IDS[0].id);
    this.setState({ recurringPaymentOptionsVisible });
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
          value={this.props.values.firstContribution}
          onChange={value => this.props.setFieldValue('firstContribution', value)}
        />
        {this.state.secondFundVisible &&
          <FundInput
            funds={this.remainingFunds}
            value={this.props.values.secondContribution}
            onChange={value => this.props.setFieldValue('secondContribution', value)}
          />
        }

        <Button
          onPress={this.handleToggleSecondFund}
          bordered
          title={this.state.secondFundVisible ? 'Remove Fund' : 'Add Another Fund'}
        />

        <Inputs.Switch
          value={this.state.recurringPaymentOptionsVisible}
          onValueChange={this.handleToggleRecurringPaymentOptionsVisibility}
          label="Schedule Contribution"
        />

        {this.state.recurringPaymentOptionsVisible &&
          <View>
            <FrequencyInput
              value={this.props.values.frequencyId}
              onChange={value => this.props.setFieldValue('frequencyId', value)}
            />
            <DateInput
              value={this.props.values.startDate}
              onChange={value => this.props.setFieldValue('startDate', value)}
            />
          </View>
        }

        <PaddedView horizontal={false}>
          <H3>my total is $<H2>{`${parseFloat(this.totalContribution).toFixed(2)}`}</H2></H3>
        </PaddedView>

        <Button
          onPress={this.props.handleSubmit}
          disabled={!(this.totalContribution > 0)}
          title="Review Contribution"
          type="primary"
        />
      </View>
    );
  }
}

export default ContributionForm;
