import React from 'react';
import PaddedView from '@ui/PaddedView';
import { H4, H6 } from '@ui/typography';
import { PersonalDetailsForm } from '@ui/forms';

const PersonalDetails = () => (
  <PaddedView>
    <H4>Personal Details</H4>
    <H6>Step 1 of 4</H6>
    <PersonalDetailsForm navigateToOnComplete="address" />
  </PaddedView>
);

export default PersonalDetails;
