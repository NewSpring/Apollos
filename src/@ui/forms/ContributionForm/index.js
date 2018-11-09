import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps, branch, renderComponent, setPropTypes, defaultProps } from 'recompose';
import { isEmpty, get } from 'lodash';
import { withFormik } from 'formik';
import Yup from 'yup';
import moment from 'moment';

import { withRouter, withProtectedFunction } from '@ui/NativeWebRouter';
import Icon from '@ui/Icon';
import withGive from '@data/withGive';
import withFinancialAccounts from '@data/withFinancialAccounts';
import withIsLoggedIn from '@data/withUser/withIsLoggedIn';
import withCheckout from '@data/withCheckout';
import ActivityIndicator from '@ui/ActivityIndicator';
import { H5, H3, BodyText } from '@ui/typography';
import CashAmountIndicator from '@ui/CashAmountIndicator';
import Button from '@ui/Button';
import * as Inputs from '@ui/inputs';
import PaddedView from '@ui/PaddedView';
import TableView from '@ui/TableView';
import styled from '@ui/styled';
import ErrorCard from '@ui/ErrorCard';

import FundInput from './FundInput';
import FrequencyInput, { FREQUENCY_IDS } from './FrequencyInput';

const LoadingView = styled({
  height: 300,
  width: '100%',
  position: 'relative',
})(ActivityIndicator);

const ButtonWrapper =
  Platform.OS === 'web'
    ? styled({
      alignItems: 'flex-start',
    })(View)
    : View;

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
})(View);

const Totals =
  Platform.OS === 'web'
    ? styled({
      alignItems: 'flex-start',
    })(PaddedView)
    : PaddedView;

const FundContributionType = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
    triggerLogin: PropTypes.func,
    isLoggedIn: PropTypes.bool,
  };

  static defaultProps = {
    funds: [],
    isOffline: false,
    offlineContactEmail: '',
    offlineMessageTitle: 'Unfortunately our giving service is offline.',
    offlineMessageBody:
      'We are working to resolve this as fast as possible. We are sorry for any inconvience this may have caused.',
    recurringPaymentOptionsAvailable: false,
  };

  state = {
    secondFundVisible: get(this.props.values, 'secondContribution.id'),
    recurringPaymentOptionsVisible: get(this.props.values, 'frequencyId') !== 'today',
  };

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

    this.props.setFieldValue(
      'secondContribution',
      secondFundVisible ? this.remainingFunds[0] : null,
    );

    this.setState({ secondFundVisible });
  };


  handleToggleRecurringPaymentOptionsVisibility = () => {
    console.log('handlethis');
    const recurringPaymentOptionsVisible = !this.state.recurringPaymentOptionsVisible;

    let frequencyId = FREQUENCY_IDS[0].id;
    if (recurringPaymentOptionsVisible) {
      this.initialFrequencyId = this.props.values.frequencyId;
    } else {
      frequencyId = this.initialFrequencyId || 'today';
    }

    this.props.setFieldValue('frequencyId', frequencyId);
    this.setState({ recurringPaymentOptionsVisible });
  };

  renderOfflineMessage() {
    return (
      <View>
        <H3>{this.props.offlineMessageTitle}</H3>
        <BodyText>{this.props.offlineMessageBody}</BodyText>
        <BodyText>
          {`We appreciate your patience. If you have any questions please contact us at ${
            this.props.offlineContactEmail
          }`}
        </BodyText>
      </View>
    );
  }

  render() {
    if (this.props.funds.length === 0) {
      return (
        <ErrorCard
          error={"We're having trouble loading funds right now, please try again later."}
        />
      );
    }
    if (this.props.isOffline) return this.renderOfflineMessage();

    const total = (parseFloat(this.totalContribution || 0) || 0).toFixed(2);

    const { touched, errors } = this.props;
    if (this.props.isLoggedIn) {
      return (

        <PaddedView horizontal={false}>
          <TableView responsive={false}>
            <PaddedView>
              <FundInput
                funds={this.props.funds}
                isFirst
                value={this.props.values.firstContribution}
                onChange={value => this.props.setFieldValue('firstContribution', value)}
                onBlur={() => this.props.setFieldTouched('firstContribution', true)}
                error={Boolean(touched.firstContribution && errors.firstContribution)}
              />
              {this.state.secondFundVisible && (
                <FundInput
                  funds={this.remainingFunds}
                  value={this.props.values.secondContribution}
                  onChange={value => this.props.setFieldValue('secondContribution', value)}
                  onBlur={() => this.props.setFieldTouched('secondContribution', true)}
                  error={Boolean(touched.secondContribution && errors.secondContribution)}
                />
              )}

              <ButtonWrapper>
                <Button
                  onPress={this.handleToggleSecondFund}
                  bordered
                  title={this.state.secondFundVisible ? 'Remove Fund' : 'Add Another Fund'}
                />
              </ButtonWrapper>
            </PaddedView>
          </TableView>

          {this.props.recurringPaymentOptionsAvailable ? (
            <PaddedView vertical={false}>
              <Inputs.Switch
                value={!!this.state.recurringPaymentOptionsVisible}
                onValueChange={this.handleToggleRecurringPaymentOptionsVisibility}
                label="Schedule Contribution"
              />
            </PaddedView>
          ) : null}

          {this.props.recurringPaymentOptionsAvailable &&
          this.state.recurringPaymentOptionsVisible ? (
            <TableView responsive={false}>
              <PaddedView>
                <View>
                  <FrequencyInput
                    value={this.props.values.frequencyId}
                    onChange={value => this.props.setFieldValue('frequencyId', value)}
                    onBlur={() => this.props.setFieldTouched('frequencyId', true)}
                    error={Boolean(touched.frequencyId && errors.frequencyId)}
                  />
                  <Inputs.DateInput
                    label="Start Date"
                    displayValue={moment(this.props.values.startDate).format('MM/DD/YYYY')}
                    value={this.props.values.startDate}
                    onChange={value => this.props.setFieldValue('startDate', value)}
                    onBlur={() => this.props.setFieldTouched('startDate', true)}
                    error={touched.startDate && errors.startDate}
                  />
                </View>
              </PaddedView>
            </TableView>
          ) : null}

          <Totals vertical={false}>
            <Row>
              {/* TODO: refactor CashAmountIndicator to take a pre/post string to wrap amount */}
              <H3>my total is </H3>
              <CashAmountIndicator amount={total} size={1} />
            </Row>
            <Button
              onPress={this.props.handleSubmit}
              disabled={!(this.totalContribution > 0) || !this.props.isValid}
              loading={this.props.isSubmitting}
              title="Review Contribution"
              type="primary"
            >
              <H5>Review Contribution</H5>
              <Icon name="lock" />
            </Button>
          </Totals>
        </PaddedView>
      );
    }
    return (
      <PaddedView>
        <Button
          onPress={this.props.triggerLogin}
          title="Sign in or create account"
          type="primary"
        />
      </PaddedView>
    );
  }
}

const initialStartDate = moment(new Date())
  .add(1, 'days')
  .toDate();

const ContributionForm = compose(
  setPropTypes({
    onComplete: PropTypes.func,
  }),
  defaultProps({
    onComplete() {},
  }),
  withGive,
  withRouter,
  withIsLoggedIn,
  withFinancialAccounts,
  withProtectedFunction(protect => ({ triggerLogin: protect })),
  withCheckout,
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
      startDate: initialStartDate,
    }),
    validationSchema: Yup.object().shape({
      firstContribution: Yup.object()
        .shape({
          id: Yup.string(),
          name: Yup.string(),
          amount: Yup.number()
            .min(1)
            .required(),
        })
        .required(),
      frequencyId: Yup.string().oneOf(['today', ...FREQUENCY_IDS.map(f => f.id)]),
      secondContribution: Yup.object()
        .nullable()
        .shape({
          id: Yup.string(),
          name: Yup.string(),
          amount: Yup.number()
            .min(1)
            .required(),
        }),
      startDate: Yup.date().min(
        moment()
          .endOf('day')
          .toDate(),
        'Start Date must be a future date',
      ),
    }),
    handleSubmit(values, { props, setSubmitting }) {
      console.log('handleSubmit');
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

      if (props.person) {
        props.setBillingPerson({
          firstName: props.person.firstName,
          lastName: props.person.lastName,
          email: props.person.email,
          campusId: get(props, 'person.campus.id', null),
        });
      }

      const userHasPaymentMethods = props.savedPaymentMethods.length > 0;
      if (userHasPaymentMethods) {
        props.isPayingWithSavedPaymentMethod();
        props.setSavedPaymentMethod(get(props, 'savedPaymentMethods.0.id', ''));
      } else {
        props.isPayingWithCreditCard();
      }

      props.onComplete({ ...props, result });
      setSubmitting(false);
    },
  }),
  branch(({ isLoading }) => isLoading, renderComponent(LoadingView)),
)(ContributionFormWithoutData);

export default ContributionForm;
