import React from 'react';
import { View, ScrollView } from 'react-native';
import ActivityIndicator from '@ui/ActivityIndicator';
import { H3 } from '@ui/typography';
import LoginForm from '@ui/forms/LoginForm';
import SignUpForm from '@ui/forms/SignUpForm';
import ChangePasswordForm from '@ui/forms/ChangePasswordForm';
import ForgotPasswordForm from '@ui/forms/ForgotPasswordForm';
import ResetPasswordForm from '@ui/forms/ResetPasswordForm';
import LogoutButton from '@ui/forms/LogoutButton';
import PaddedView from '@ui/PaddedView';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import LiveNowButton from '@ui/LiveNowButton';
import withUser from '@data/withUser';

const enhance = withUser;

const LoggedOutUserView = () => (
  <View>
    <H3>{'Login'}</H3>
    <LoginForm />

    <H3>{'Signup'}</H3>
    <SignUpForm />

    <H3>{'Forgot password'}</H3>
    <ForgotPasswordForm />

    <H3>{'Reset password'}</H3>
    <ResetPasswordForm />
  </View>
);

const LoggedInUserView = () => (
  <View>
    <H3>{'Change password'}</H3>
    <ChangePasswordForm />

    <H3>{'Logout'}</H3>
    <LogoutButton />
  </View>
);

const Profile = enhance(({ user, isLoading }) => {
  let UserView = ActivityIndicator;
  if (!isLoading) {
    if (user) {
      UserView = LoggedInUserView;
    } else {
      UserView = LoggedOutUserView;
    }
  }

  return (
    <FlexedView>
      <Header titleText="Profile" />
    <LiveNowButton />
      <ScrollView>
        <PaddedView>
          <UserView />
        </PaddedView>
      </ScrollView>
    </FlexedView>
  );
});

export default Profile;
