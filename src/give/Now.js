import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import { mapProps, compose } from 'recompose';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Header from '@modules/Header';
import FlexedView from '@primitives/FlexedView';
import withGive from '@data/withGive';
import ContributionForm from './ContributionForm';
import PersonalDetailsForm from './PersonalDetailsForm';
import BillingAddressForm from './BillingAddressForm';

export class Now extends Component {
  static propTypes = {
    onSubmitContributionForm: PropTypes.func,
    onSubmitPersonalDetailsForm: PropTypes.func,
    onSubmitBillingAddressForm: PropTypes.func,
  };

  static defaultProps = {
    onSubmitContributionForm() {},
    onSubmitPersonalDetailsForm() {},
    onSubmitBillingAddressForm() {},
  };

  render() {
    console.log(this.props);
    return (
      <FlexedView>
        <Header titleText="Give Dashboard" />
        <Text>Step 1 - Capture Contributions</Text>
        <ContributionForm
          onSubmit={this.props.onSubmitContributionForm}
        />

        <Text>Step 2 - Billing Identity</Text>
        <PersonalDetailsForm
          onSubmit={this.props.onSubmitPersonalDetailsForm}
        />

        <Text>Step 3 - Billing Address</Text>
        <BillingAddressForm
          onSubmit={this.props.onSubmitBillingAddressForm}
        />

        <Text>Step 4 - Payment Details (CC or ACH)</Text>
        <Text>Step 5 - Confirmation</Text>
        <Text>Step 6 - Thank you</Text>

      </FlexedView>
    );
  }
}

const enhance = compose(
  withGive,
  mapProps(props => ({
    ...props,
    onSubmitContributionForm(formValues) {
      props.resetContributions();
      props.addContribution(formValues.firstContribution);

      if (!isEmpty(formValues.secondContribution)) {
        props.addContribution(formValues.secondContribution);
      }
      props.setContributionFrequency(formValues.frequencyId);
      props.setContributionStartDate(formValues.startDate);
    },
    onSubmitPersonalDetailsForm: props.setBillingPerson,
    onSubmitBillingAddressForm: async (formValues) => {
      try {
        props.setBillingAddress(formValues);
        const createOrderResponse = await props.createOrder();
        const order = get(createOrderResponse, 'data.order', {});
        props.setOrder({
          url: order.url,
        });
      } catch (err) {
        throw err;
      }
    },
  })),
);

export default enhance(Now);
