import React from 'react';
import {
  ScrollView,
} from 'react-native';
import FlexedView from '@ui/FlexedView';
import ContributionHistoryList from './ContributionHistoryList';

function ContributionHistory() {
  return (
    <FlexedView>
      <ScrollView>
        <ContributionHistoryList />
      </ScrollView>
    </FlexedView>
  );
}

export default ContributionHistory;
