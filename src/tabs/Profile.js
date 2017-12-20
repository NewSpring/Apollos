import React from 'react';
import {
  Text,
  ScrollView,
} from 'react-native';
import LoginForm from '@ui/forms/LoginForm';
import SignUpForm from '@ui/forms/SignUpForm';
import ChangePasswordForm from '@ui/forms/ChangePasswordForm';
import LogoutButton from '@ui/forms/LogoutButton';
import FlexedView from '@ui/FlexedView';

export default function Profile() {
  return (
    <FlexedView>
      <ScrollView>
        <Text>{'login'}</Text>
        <LoginForm />

        <Text>{'signup'}</Text>
        <SignUpForm />

        <Text>{'change password'}</Text>
        <ChangePasswordForm />

        <Text>{'logout'}</Text>
        <LogoutButton />
      </ScrollView>
    </FlexedView>
  );
}
