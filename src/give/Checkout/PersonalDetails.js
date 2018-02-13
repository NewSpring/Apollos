import React from 'react';
import BackgroundView from '@ui/BackgroundView';
import PaddedView from '@ui/PaddedView';
import { PersonalDetailsForm } from '@ui/forms';

import { Title } from './styles';

const PersonalDetails = () => (
  <BackgroundView>
    <PaddedView>
      <Title>Personal Details</Title>
    </PaddedView>
    <PersonalDetailsForm navigateToOnComplete="address" />
  </BackgroundView>
);

export default PersonalDetails;
