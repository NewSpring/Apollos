import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  compose,
  withProps,
  branch,
  renderComponent,
  setPropTypes,
  defaultProps,
} from 'recompose';
import { isEmpty, get } from 'lodash';
import { withFormik } from 'formik';
import Yup from 'yup';

import { withRouter } from '@ui/NativeWebRouter';

import withGive from '@data/withGive';
import withFinancialAccounts from '@data/withFinancialAccounts';
import withCheckout from '@data/withCheckout';
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

export class ContributionFormWithoutData extends Component {
  static propTypes = {
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
    touched: PropTypes.shape({
      secondFundVisible: PropTypes.bool,
      firstContribution: PropTypes.bool,
      secondContribution: PropTypes.bool,
      frequencyId: PropTypes.bool,
      startDate: PropTypes.bool,
    }),
    errors: PropTypes.shape({
      secondFundVisible: PropTypes.string,
      firstContribution: PropTypes.string,
      secondContribution: PropTypes.string,
      frequencyId: PropTypes.string,
      startDate: PropTypes.string,
    }),
    setFieldTouched: PropTypes.func,
    isSubmitting: PropTypes.bool,
    isValid: PropTypes.bool,
    recurringPaymentOptionsAvailable: PropTypes.bool,
  };

  static defaultProps = {
    funds: [],
    isOffline: false,
    offlineContactEmail: '',
    offlineMessageTitle: 'Unfortunately our giving service is offline.',
    offlineMessageBody: 'We are working to resolve this as fast as possible. We are sorry for any inconvience this may have caused.',
    recurringPaymentOptionsAvailable: false,
  };

  state = {
    secondFundVisible: get(this.props.values, 'secondContribution.id'),
    recurringPaymentOptionsVisible: get(this.props.values, 'frequencyId') !== 'today',
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

    let frequencyId = FREQUENCY_IDS[0].id;
    if (recurringPaymentOptionsVisible) {
      this.initialFrequencyId = this.props.values.frequencyId;
    } else {
      frequencyId = this.initialFrequencyId || 'today';
    }

    this.props.setFieldValue('frequencyId', frequencyId);
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
    if (this.props.funds.length === 0) return <Text>{'There are no funds to contribute to!'}</Text>;
    if (this.props.isOffline) return this.renderOfflineMessage();

    const total = (parseFloat(this.totalContribution || 0) || 0).toFixed(2);

    const { touched, errors } = this.props;

    return (
      <View>
        <FundInput
          funds={this.props.funds}
          isFirst
          value={this.props.values.firstContribution}
          onChange={value => this.props.setFieldValue('firstContribution', value)}
          onBlur={() => this.props.setFieldTouched('firstContribution', true)}
          error={Boolean(touched.firstContribution && errors.firstContribution)}
        />
        {this.state.secondFundVisible &&
          <FundInput
            funds={this.remainingFunds}
            value={this.props.values.secondContribution}
            onChange={value => this.props.setFieldValue('secondContribution', value)}
            onBlur={() => this.props.setFieldTouched('secondContribution', true)}
            error={Boolean(touched.secondContribution && errors.secondContribution)}
          />
        }

        <Button
          onPress={this.handleToggleSecondFund}
          bordered
          title={this.state.secondFundVisible ? 'Remove Fund' : 'Add Another Fund'}
        />

        {this.props.recurringPaymentOptionsAvailable &&
          <Inputs.Switch
            value={!!this.state.recurringPaymentOptionsVisible}
            onValueChange={this.handleToggleRecurringPaymentOptionsVisibility}
            label="Schedule Contribution"
          />
        }
        {this.props.recurringPaymentOptionsAvailable && this.state.recurringPaymentOptionsVisible &&
          <View>
            <FrequencyInput
              value={this.props.values.frequencyId}
              onChange={value => this.props.setFieldValue('frequencyId', value)}
              onBlur={() => this.props.setFieldTouched('frequencyId', true)}
              error={Boolean(touched.frequencyId && errors.frequencyId)}
            />
            <DateInput
              value={this.props.values.startDate}
              onChange={value => this.props.setFieldValue('startDate', value)}
              onBlur={() => this.props.setFieldTouched('startDate', true)}
              error={Boolean(touched.startDate && errors.startDate)}
            />
          </View>
        }

        <PaddedView horizontal={false}>
          <H3>my total is $<H2>{total.split('.')[0]}</H2>.{total.split('.')[1]}</H3>
        </PaddedView>

        <Button
          onPress={this.props.handleSubmit}
          disabled={!(this.totalContribution > 0) || !this.props.isValid}
          loading={this.props.isSubmitting}
          title="Review Contribution"
          type="primary"
        />
      </View>
    );
  }
}

const ContributionForm = compose(
  setPropTypes({
    onComplete: PropTypes.func,
  }),
  defaultProps({
    onComplete() {},
  }),
  withGive,
  withRouter,
  withFinancialAccounts,
  withCheckout,
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
  withProps(({ accounts, person }) => ({
    funds: accounts,
    recurringPaymentOptionsAvailable: !!person,
  })),
  withFormik({
    mapPropsToValues: props => ({
      firstContribution: {
        id: props.funds && props.funds[0] && props.funds[0].id,
        name: props.funds && props.funds[0] && props.funds[0].name,
      },
      frequencyId: 'today',
      secondContribution: null,
      startDate: new Date(),
    }),
    validationSchema: Yup.object().shape({
      firstContribution: Yup.object().shape({
        id: Yup.string(),
        name: Yup.string(),
        amount: Yup.number().required(),
      }).required(),
      frequencyId: Yup.string().oneOf(['today', ...FREQUENCY_IDS.map(f => f.id)]),
      secondContribution: Yup.object().nullable().shape({
        id: Yup.string(),
        name: Yup.string(),
        amount: Yup.number().required(),
      }),
      startDate: Yup.date().min(new Date()),
    }),
    handleSubmit(values, { props, setSubmitting }) {
      const result = { ...values };
      if (get(result, 'firstContribution.amount')) {
        result.firstContribution.amount = parseFloat(result.firstContribution.amount);
      }

      if (get(result, 'secondContribution.amount')) {
        result.secondContribution.amount = parseFloat(result.secondContribution.amount);
      }

      props.resetContributions();
      props.addContribution(result.firstContribution);
      if (!isEmpty(result.secondContribution)) {
        props.addContribution(result.secondContribution);
      }

      props.setContributionFrequency(result.frequencyId);
      props.setContributionStartDate(result.startDate);

      const userHasPaymentMethods = props.savedPaymentMethods.length > 0;
      if (userHasPaymentMethods) {
        props.isPayingWithSavedPaymentMethod();
        props.setSavedPaymentMethod(get(props, 'savedPaymentMethods.0.id', ''));
      } else {
        props.isPayingWithCreditCard();
      }

      props.onComplete(props);
      setSubmitting(false);
    },
  }),
)(ContributionFormWithoutData);

export default ContributionForm;
