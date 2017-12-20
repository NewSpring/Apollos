import React from 'react';
import { ScrollView } from 'react-native';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';
import { ContributionForm } from '@ui/forms';

const Now = () => (
  <FlexedView>
    <Header titleText="Give Dashboard" />
    <ScrollView>
      <PaddedView>
        <ContributionForm navigateToOnComplete="/give/checkout" />
      </PaddedView>
    </ScrollView>
  </FlexedView>
);

export default Now;
