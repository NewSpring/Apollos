import React, { PureComponent } from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import get from 'lodash/get';
import { H5, UIText } from '@ui/typography';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';
import BillingAddressForm from '@ui/forms/BillingAddressForm';
import PaymentForm from '@ui/forms/PaymentForm';
import SavedPaymentReviewForm from '@ui/forms/SavedPaymentReviewForm';
import withGivingDashboard from '@data/withGivingDashboard';
import last4 from '@utils/last4';

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
  };

  static defaultProps = {
    savedPaymentMethods: [],
  };

  render() {
    return (
      <FlexedView>
        <Header titleText="Give Dashboard" />
        <ScrollView>
          <PaddedView>
            <H5>{'Dashboard (add account)'}</H5>
            <BillingAddressForm />
            <PaymentForm
              enforceAccountName
            />
            <SavedPaymentReviewForm />

            <H5>{'Dashboard (view accounts)'}</H5>
            {this.props.savedPaymentMethods.map(pm => (
              <View key={pm.id}>
                <UIText>{pm.name}</UIText>
                <UIText>{pm.paymentMethod}</UIText>
                <UIText>{last4(pm.accountNumber)}</UIText>
              </View>
            ))}
          </PaddedView>
        </ScrollView>
      </FlexedView>
    );
  }
}

// TODO: Split withGivingDashboard, add edit name and delete mutations
const enhance = compose(
  withGivingDashboard,
  mapProps(props => ({
    ...props,
    savedPaymentMethods: (get(props, 'savedPaymentMethods') || []).map(pm => ({
      ...pm,
      paymentMethod: pm.payment.paymentType === 'ACH' ? 'bankAccount' : 'creditCard',
      accountNumber: pm.payment.accountNumber,
    })),
  })),
);

export default enhance(Dashboard);
