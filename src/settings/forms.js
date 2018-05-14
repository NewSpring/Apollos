import React from 'react';

import KeyboardAwareScrollView from '@ui/KeyboardAwareScrollView';
import { ProfileDetailsForm, ProfileAddressForm, ChangePasswordForm } from '@ui/forms';

import Layout from './Layout';

const makeFormScreen = (Form, title = 'Title') => (props) => {
  const minFill = { minHeight: '100%' };

  return (
    <Layout title={title}>
      <KeyboardAwareScrollView contentContainerStyle={minFill}>
        <Form {...props} />
      </KeyboardAwareScrollView>
    </Layout>
  );
};

export const ProfileDetails = makeFormScreen(ProfileDetailsForm, 'Personal Details');
export const ProfileAddress = makeFormScreen(ProfileAddressForm, 'Your Address');
export const ChangePassword = makeFormScreen(ChangePasswordForm, 'Change Your Password');
