import React from 'react';
import Header from '@modules/Header';
import FlexedView from '@primitives/FlexedView';
import ContributionForm from './ContributionForm';

export default function Now() {
  return (
    <FlexedView>
      <Header titleText="Give Dashboard" />
      <ContributionForm onSubmit={console.log} />
    </FlexedView>
  );
}
