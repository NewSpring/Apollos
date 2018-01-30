import React from 'react';
import { ScrollView } from 'react-native';
import { ProfileDetailsForm, ProfileAddressForm, ChangePasswordForm } from '@ui/forms';
import Header from '@ui/Header';

import Layout from './Layout';

const makeFormScreen = (Form, title = 'Title') => props => (
  <Layout>
    <Header webEnabled titleText={title} backButton />
    <ScrollView>
      <Form {...props} />
    </ScrollView>
  </Layout>
);

export const ProfileDetails = makeFormScreen(ProfileDetailsForm, 'Personal Details');
export const ProfileAddress = makeFormScreen(ProfileAddressForm, 'Your Address');
export const ChangePassword = makeFormScreen(ChangePasswordForm, 'Change Your Password');
