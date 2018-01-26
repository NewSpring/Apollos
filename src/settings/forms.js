import React from 'react';
import { ScrollView } from 'react-native';
import { ProfileDetailsForm, ProfileAddressForm, ChangePasswordForm } from '@ui/forms';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';

const makeFormScreen = (Form, title = 'Title') => props => (
  <FlexedView>
    <Header titleText={title} backButton />
    <ScrollView>
      <Form {...props} />
    </ScrollView>
  </FlexedView>
);

export const ProfileDetails = makeFormScreen(ProfileDetailsForm, 'Personal Details');
export const ProfileAddress = makeFormScreen(ProfileAddressForm, 'Your Address');
export const ChangePassword = makeFormScreen(ChangePasswordForm, 'Change Your Password');
