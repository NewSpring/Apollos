import React from 'react';
import { ScrollView } from 'react-native';
import { compose, withProps, branch, renderComponent } from 'recompose';
import { isEmpty, get } from 'lodash';
import { withFormik } from 'formik';

import { withRouter } from '@ui/NativeWebRouter';
import ActivityIndicator from '@ui/ActivityIndicator';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';
import withGive from '@data/withGive';
import withFinancialAccounts from '@data/withFinancialAccounts';
import { ContributionForm } from '@ui/forms';

const Contribution = compose(
  withGive,
  withRouter,
  withFinancialAccounts,
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
  withProps(({ accounts }) => ({ funds: accounts })),
  withFormik({
    mapPropsToValues: props => ({
      firstContribution: {
        id: props.funds && props.funds[0] && props.funds[0].id,
        name: props.funds && props.funds[0] && props.funds[0].name,
      },
      secondContribution: null,
      startDate: new Date(),
    }),
    handleSubmit(values, { props }) {
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

      props.history.push('/give/checkout');
    },
  }),
)(ContributionForm);

const Now = () => (
  <FlexedView>
    <Header titleText="Give Dashboard" />
    <ScrollView>
      <PaddedView>
        <Contribution />
      </PaddedView>
    </ScrollView>
  </FlexedView>
);

export default Now;
