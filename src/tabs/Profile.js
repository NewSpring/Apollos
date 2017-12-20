import React from 'react';
import LoginForm from '@ui/forms/LoginForm';
import SignUpForm from '@ui/forms/SignUpForm';
import LogoutButton from '@ui/forms/LogoutButton';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';

export default function Profile() {
  return (
    <FlexedView>
      <Header titleText="Profile" />
      <LoginForm />
      <SignUpForm />
      <LogoutButton />
    </FlexedView>
  );
}
