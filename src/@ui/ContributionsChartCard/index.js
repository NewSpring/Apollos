import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import Card from '@ui/Card';
import ContributionsChart from '@ui/ContributionsChart';
import withContributionsChartData from '@data/withContributionsChartData';
// import { UIText } from '@ui/typography';
import CashAmountIndicator from '@ui/CashAmountIndicator';

export class ContributionsChartCard extends PureComponent {
  static propTypes = {
    total: PropTypes.number,
  };

  static defaultProps = {
    total: 0,
  };

  render() {
    return (
      <Card>
        <ContributionsChart />
        <CashAmountIndicator
          amount={this.props.total}
          size={2}
        />
      </Card>
    );
  }
}

const enhance = compose(
  withContributionsChartData,
);

export default enhance(ContributionsChartCard);
