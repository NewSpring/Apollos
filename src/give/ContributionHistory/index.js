import React, { PureComponent } from 'react';
import FlexedView from '@ui/FlexedView';
import withTransactions from '@data/withTransactions';
import ContributionHistoryList from './ContributionHistoryList';
import ContributionHistoryFilter from './ContributionHistoryFilter';

class ContributionHistory extends PureComponent {
  static propTypes = {
    ...ContributionHistoryList.propTypes,
  };

  static defaultProps = {
    ...ContributionHistoryList.defaultProps,
  };

  handleFilter = ({ startDate, endDate } = {}) => {
    this.props.setFilterDateRange({
      startDate,
      endDate,
    });
  }

  render() {
    return (
      <FlexedView>
        <ContributionHistoryFilter
          onSubmit={this.handleFilter}
        />
        <ContributionHistoryList
          fetchMore={this.props.fetchMore}
          isLoading={this.props.isLoading}
          refetch={this.props.refetch}
          transactions={this.props.transactions}
        />
      </FlexedView>
    );
  }
}

export default withTransactions(ContributionHistory);
