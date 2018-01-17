import React, { PureComponent } from 'react';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter } from '@ui/NativeWebRouter';
import { H5, UIText } from '@ui/typography';
import Header from '@ui/Header';
import AccountCard from '@ui/AccountCard';
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
  };

  static defaultProps = {
    savedPaymentMethods: [],
    activityItems: [],
  };

  render() {
    return (
      <FlexedView>
        <Header titleText="Give Dashboard" />
        <ScrollView>
          <PaddedView>
            <H5>{'Dashboard (activity)'}</H5>
            {this.props.activityItems.map((at) => {
              // eslint-disable-next-line no-underscore-dangle
              if (at.__typename === 'Transaction') {
                return (
                  <UIText>{at.summary}</UIText>
                );
              }
              return (
                <UIText>{at.name}</UIText>
              );
            })}

            <H5>{'Dashboard (add account)'}</H5>
            <BillingAddressForm />
            <PaymentForm
              enforceAccountName
            />
            <SavedPaymentReviewForm />
          </PaddedView>

          <H5>{'Dashboard (view accounts)'}</H5>
          {this.props.savedPaymentMethods.map(pm => (
            <TouchableWithoutFeedback
              onPress={() => this.props.history.push(`/give/payment-methods/${pm.id}`)}
            >
              <AccountCard
                key={pm.id}
                title={pm.name}
                accountNumber={pm.accountNumber}
                accountType={pm.paymentMethod}
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
