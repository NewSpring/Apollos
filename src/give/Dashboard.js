/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import get from 'lodash/get';
import { withRouter } from '@ui/NativeWebRouter';
import { H5 } from '@ui/typography';
import Header from '@ui/Header';
import AccountCard from '@ui/AccountCard';
import ScheduleCard from '@ui/ScheduleCard';
import TransactionCard from '@ui/TransactionCard';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';
import BillingAddressForm from '@ui/forms/BillingAddressForm';
import PaymentForm from '@ui/forms/PaymentForm';
import SavedPaymentReviewForm from '@ui/forms/SavedPaymentReviewForm';
import withGivingDashboard from '@data/withGivingDashboard';

export class Dashboard extends PureComponent {
  static propTypes = {
    savedPaymentMethods: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      name: PropTypes.string,
      paymentMethod: PropTypes.oneOf(['bankAccount', 'creditCard']),
      accountNumber: PropTypes.string,
    })),
    activityItems: PropTypes.arrayOf(PropTypes.shape({})), // One of many :'(
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    scheduledTransactions: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    savedPaymentMethods: [],
    activityItems: [],
    scheduledTransactions: [],
  };

  render() {
    return (
      <FlexedView>
        <Header titleText="Give Dashboard" />
        <ScrollView>
          <H5>{'Dashboard (activity)'}</H5>
          {this.props.activityItems.filter(at => (at.__typename === 'Transaction')).map(activityItem => (
            <TransactionCard
              key={activityItem.id}
              date={activityItem.date}
              status={activityItem.status}
              details={activityItem.details}
              isScheduled={activityItem.scheduled}
              amount={activityItem.amount}
              error={activityItem.statusMessage}
              onPress={() => { console.log('route to', activityItem.id); }}
            />
          ))}

          <PaddedView>
            <H5>{'Dashboard (add account)'}</H5>
            <BillingAddressForm />
            <PaymentForm
              enforceAccountName
            />
            <SavedPaymentReviewForm />
          </PaddedView>

          <H5>{'Dashboard (active schedules)'}</H5>
          {this.props.scheduledTransactions.map(scheduledTransaction => (
            <ScheduleCard
              key={scheduledTransaction.id}
              accountName={get(scheduledTransaction, 'details.0.account.name')}
              amount={get(scheduledTransaction, 'details.0.amount')}
              frequency={get(scheduledTransaction, 'schedule.description')}
              startDate={get(scheduledTransaction, 'start')}
              onPress={() => { console.log('route to', scheduledTransaction.id); }}
            />
          ))}

          <H5>{'Dashboard (view accounts)'}</H5>
          {this.props.savedPaymentMethods.map(paymentMethod => (
            <TouchableWithoutFeedback
              onPress={() => this.props.history.push(`/give/payment-methods/${paymentMethod.id}`)}
            >
              <AccountCard
                key={paymentMethod.id}
                title={paymentMethod.name}
                accountNumber={paymentMethod.accountNumber}
                accountType={paymentMethod.paymentMethod}
              />
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </FlexedView>
    );
  }
}

// TODO: Split withGivingDashboard, add edit name and delete mutations
const enhance = compose(
  withGivingDashboard,
  withRouter,
);

export default enhance(Dashboard);
