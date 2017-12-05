import React, { Component } from 'react';
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
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onSubmit() {},
  };

  render() {
    return (
      <FlexedView>
        <Header titleText="Give Dashboard" />
        <ContributionForm
          onSubmit={this.props.onSubmit}
        />
        <PersonalDetailsForm />
      </FlexedView>
    );
  }
}

const enhance = compose(
  withGive,
  mapProps(props => ({
    ...props,
    onSubmit(formValues) {
      // Should this be just one setter? This is the business logic
      props.resetContributions();
      props.addContribution(formValues.firstContribution);

      if (!isEmpty(formValues.secondContribution)) {
        props.addContribution(formValues.secondContribution);
      }
      props.setContributionFrequency(formValues.frequencyId);
      props.setContributionStartDate(formValues.startDate);
    },
  })),
);

export default enhance(Now);
