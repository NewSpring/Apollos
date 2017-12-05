import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import { mapProps, compose } from 'recompose';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Header from '@modules/Header';
import FlexedView from '@primitives/FlexedView';
import withGive from '@data/withGive';
import ContributionForm from './ContributionForm';
import PersonalDetailsForm from './PersonalDetailsForm';

export class Now extends Component {
  static propTypes = {
    onSubmitContributionForm: PropTypes.func,
    onSubmitPersonalDetailsForm: PropTypes.func,
  };

  static defaultProps = {
    onSubmitContributionForm() {},
    onSubmitPersonalDetailsForm() {},
  };

  render() {
    return (
      <FlexedView>
        <Header titleText="Give Dashboard" />
        <Text>Step 1</Text>
        <ContributionForm
          onSubmit={this.props.onSubmitContributionForm}
        />

        <Text>Step 2</Text>
        <PersonalDetailsForm
          onSubmit={this.props.onSubmitPersonalDetailsForm}
        />

        <Text>Step 3 - Billing Address</Text>
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
      // Should this be just one setter? This is the business logic
      props.resetContributions();
      props.addContribution(formValues.firstContribution);

      if (!isEmpty(formValues.secondContribution)) {
        props.addContribution(formValues.secondContribution);
      }
      props.setContributionFrequency(formValues.frequencyId);
      props.setContributionStartDate(formValues.startDate);
    },
    onSubmitPersonalDetailsForm(formValues) {
      console.log(formValues);
    },
  })),
);

export default enhance(Now);
