import React from 'react';
import Header from '@modules/Header';
import FlexedView from '@primitives/FlexedView';
import LoginForm from '@modules/LoginForm';
import SignUpForm from '@modules/SignUpForm';

export default function Profile() {
  return (
    <FlexedView>
      <Header titleText="Profile" />
      <LoginForm />
      <SignUpForm />
    </FlexedView>
  );
}
